import "../styles.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header.js";
// import Compute from "../components/Compute.js";
import ModifyWords from "../components/ModifyWords.js";
import LoadWords from "../components/LoadWords.js";
import { Link } from 'react-router-dom';
import SetListsToSame from "../components/SetListsToSame";
import BestTree from "../components/BestTree";

export default function Welcome({ answerList, setAnswerList, allowedList, setAllowedList, answerLength, allowedLength,
    user, setBestTree, handleLogOut }) {



    const [answerListFreq, setAnswerListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [allowedListFreq, setAllowedListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [promptMessage, setPromptMessage] = useState('');

    const [showPrompt, setShowPrompt] = useState(false);

    const [closeable, setCloseable] = useState(true);

    const [showWarningPrompt, setShowWarningPrompt] = useState(false);

    const [warningPromptMessage, setWarningPromptMessage] = useState('');

    const navigate = useNavigate();

    const evaluateTree = (event) => {
        event.preventDefault();
        BestTree(answerList, allowedList, setBestTree, user, setPromptMessage, setShowPrompt, setCloseable, navigate);
    }

    return (
        <>
            <div className="sidebar">
                <br />
                {!user.isLoggedIn ?
                    <>
                        <Link to="/Login">Login to save your data</Link>
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
                <LoadWords user={user} showPrompt={showPrompt} setShowPrompt={setShowPrompt} promptMessage={promptMessage}
                    setPromptMessage={setPromptMessage} closeable={closeable} setCloseable={setCloseable}
                    setAnswerList={setAnswerList} setAllowedList={setAllowedList} setBestTree={setBestTree} />
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

                <h2>Allowed List</h2>
                <ModifyWords wordList={allowedList} setWordList={setAllowedList} len={allowedLength}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                    closeable={closeable} setCloseable={setCloseable}
                    wordListFreq={allowedListFreq} setWordListFreq={setAllowedListFreq}
                    user={user} id={2} />

                {/* Insert search parameters here */}

                <button onClick={evaluateTree}>Click me</button>
                {/* <a href="./DecisionTree" onClick={evaluateTree}>Compute</a> */}
                <div style={{ height: "30px" }}></div>

            </main>
        </>
    );
}