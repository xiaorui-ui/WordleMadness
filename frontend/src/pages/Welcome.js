import "../styles.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header.js";
import ModifyWords from "../components/ModifyWords.js";
import { Link } from 'react-router-dom';
import SetListsToSame from "../components/SetListsToSame";
import BestTree from "../components/BestTree";

export default function Welcome({ answerList, setAnswerList, allowedList, setAllowedList, answerLength, allowedLength,
    user, setBestTree, handleLogOut, showPrompt, setShowPrompt, promptMessage,
    setPromptMessage, closeable, setCloseable }) {



    const [answerListFreq, setAnswerListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [allowedListFreq, setAllowedListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [showWarningPrompt, setShowWarningPrompt] = useState(false);

    const [warningPromptMessage, setWarningPromptMessage] = useState('');

    const [treeWidth, setTreeWidth] = useState(-1);

    const navigate = useNavigate();

    const handleWidthChange = (event) => {
        setTreeWidth(event.target.value);
    }

    const evaluateTree = (event) => {
        event.preventDefault();
        BestTree(answerList, allowedList, treeWidth, setBestTree, user, setPromptMessage, setShowPrompt, setCloseable, navigate);
    }

    return (
        <>
            <div className="sidebar">
                <h2 style={{ fontWeight: 'normal' }}>Sections</h2>
                <a href="#Answer list">Answer list</a><br />
                <a href="#Allowed list">Allowed list</a><br />
                <a href="#Search parameters">Search parameters</a><br />

                <div style={{ height: "50px" }}></div>

                <h2 style={{ fontWeight: 'normal' }}>Pages</h2>
                {!user.isLoggedIn ?
                    <>
                        <Link to="/Login">Login to use decision tree</Link>
                        <br />
                    </>
                    :
                    <>
                        <span onClick={handleLogOut} style={{ cursor: "pointer" }}>Log Out</span>
                        <br />
                    </>
                }
                <Link to="/UserGuide">User Guide</Link>
                <br />
                <Link to="/DecisionTree">Decision Tree</Link>
            </div>

            <main className="main-content">
                <p id="Answer list"></p>
                {/* To implement firstTime */}
                <Header user={user} firstTime={true} />

                <h2>Answer List</h2>
                <ModifyWords wordList={answerList} setWordList={setAnswerList} len={answerLength}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                    closeable={closeable} setCloseable={setCloseable}
                    wordListFreq={answerListFreq} setWordListFreq={setAnswerListFreq}
                    user={user} id={1} />
                {/* Id differentiates between lists 1 and 2 in the BE */}

                <SetListsToSame answerList={answerList} setAllowedList={setAllowedList} showWarningPrompt={showWarningPrompt}
                    setShowWarningPrompt={setShowWarningPrompt} warningPromptMessage={warningPromptMessage}
                    setWarningPromptMessage={setWarningPromptMessage} showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage} closeable={closeable}
                    setCloseable={setCloseable} user={user} />

                <p id="Allowed list"></p>
                <h2>Allowed List</h2>
                <ModifyWords wordList={allowedList} setWordList={setAllowedList} len={allowedLength}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                    closeable={closeable} setCloseable={setCloseable}
                    wordListFreq={allowedListFreq} setWordListFreq={setAllowedListFreq}
                    user={user} id={2} />


                {/* Search parameters */}
                <h2 id="Search parameters">Search parameters</h2>


                <p className="break-after-characters">
                    We use decision trees to decide which word is the best word.
                    At each stage, we shortlist a few possible words and decide which word is indeed the best in a
                    bottom-up manner.

                    <div style={{ height: "30px" }}></div>

                    Pruning method refers to how the words in the answer list are shortlisted.
                    Pruning by number of colourings means an allowed word can can give 8 colourings amongst the answers, say,
                    is favoured over another word that gives 7.

                    <div style={{ height: "30px" }}></div>


                    Tree width means the number of candidates taken at each stage of the decision tree, excluding ties.
                    For example, if the tree width is 3, and the top words give 11, 9, 8, 6, ... colourings,
                    then we pick the top 3 words as possible candidates.
                    But if the top words give 4, 4, 3, 3, 2, ... colourings,
                    then we pick the top 4 words as possible candidates instead.

                    <div style={{ height: "30px" }}></div>

                    Picking a larger tree width means the total tries will possibly be less at the cost of more time.
                    The effects are more noticeable with longer answer and allowed lists.

                    <div style={{ height: "30px" }}></div>
                </p>

                <p>Pruning method: # of colourings</p>

                <div style={{ height: "30px" }}></div>

                <p>Tree width from 1-8:</p>
                <input onChange={handleWidthChange} />

                <div style={{ height: "30px" }}></div>


                <button onClick={evaluateTree}>Best word</button>
                <div style={{ height: "30px" }}></div>

            </main>
        </>
    );
}