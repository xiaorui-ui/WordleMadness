import "../styles.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Welcome/Header.js";
import SearchParams from "../components/Welcome/SearchParams.js";
import ModifyWords from "../components/ModifyWords.js";
import { HashLink as Link } from 'react-router-hash-link';
import SetListsToSame from "../components/SetListsToSame";
import BestTree from "../components/BestTree";

export default function Welcome({ answerList, setAnswerList, allowedList, setAllowedList, answerLength, allowedLength,
    user, setBestTree, handleLogOut, showPrompt, setShowPrompt, promptMessage,
    setPromptMessage, closeable, setCloseable, setTime }) {

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



    const evaluateTree = (event) => {
        event.preventDefault();
        BestTree(answerList, allowedList, treeWidth, setBestTree, user,
            setPromptMessage, setShowPrompt, setCloseable, navigate, setTime);
    }

    return (
        <>
            <div className="sidebar">
                <h2 style={{ fontWeight: 'normal' }}>Sections</h2>
                <a href="#Search parameters">Search parameters</a><br />
                <a href="#Answer list">Answer list</a><br />
                <a href="#Allowed list">Allowed list</a><br />


                <div style={{ height: "50px" }}></div>

                <h2 style={{ fontWeight: 'normal' }}>Pages</h2>
                {!user.isLoggedIn ?
                    <>
                        <Link to="/Login">Login/Registration</Link>
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

                <Header user={user} firstTime={true} />

                <SearchParams treeWidth={treeWidth} setTreeWidth={setTreeWidth} />

                <div style={{ height: "30px" }}></div>

                <button onClick={evaluateTree}>Best word</button>
                <div style={{ height: "30px" }}></div>

                <p id="Answer list"></p>

                <h2>Answer List</h2>
                <p>(the set of possible answers in your Wordle)</p>
                <ModifyWords wordList={answerList} setWordList={setAnswerList} len={answerLength}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                    closeable={closeable} setCloseable={setCloseable}
                    wordListFreq={answerListFreq} setWordListFreq={setAnswerListFreq}
                    user={user} id={1} />
                {/* Id differentiates between lists 1 and 2 in the BE */}

                <p id="Allowed list"></p>

                <SetListsToSame answerList={answerList} setAllowedList={setAllowedList} showWarningPrompt={showWarningPrompt}
                    setShowWarningPrompt={setShowWarningPrompt} warningPromptMessage={warningPromptMessage}
                    setWarningPromptMessage={setWarningPromptMessage} showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage} closeable={closeable}
                    setCloseable={setCloseable} user={user} />

                <h2>Allowed List</h2>
                <p>(the set of words you can guess in your Wordle)</p>
                <ModifyWords wordList={allowedList} setWordList={setAllowedList} len={allowedLength}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                    closeable={closeable} setCloseable={setCloseable}
                    wordListFreq={allowedListFreq} setWordListFreq={setAllowedListFreq}
                    user={user} id={2} />

            </main>
        </>
    );
}