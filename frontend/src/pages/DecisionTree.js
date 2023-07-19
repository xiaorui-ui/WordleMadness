import { Link } from "react-router-dom";
import { BACKEND_COMPUTE } from "../components/Constants.js";
// import Username from "../components/Username.js";
import { useState } from "react";
import axios from 'axios';
import LoadWords from "../components/LoadWords.js";
import CustomPrompt from "../components/CustomPrompt.js";
import Tree from "../components/DecisionTree/Tree.js";


export default function DecisionTree({ answerList, setAnswerList, allowedList, setAllowedList,
    user, handleLogOut, bestTree, setBestTree }) {

    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");
    const [closeable, setCloseable] = useState(true);

    const handleDismiss = () => {
        setShowPrompt(false);
    }


    return (
        <>
            <div className="sidebar">

                {!user.isLoggedIn ?
                    <>
                        <br />
                        <Link to="/Login">Login to save your data</Link>
                        <br />
                    </>
                    :
                    <>
                        <>Hello, {user.name} !</>

                        <div style={{ height: "30px" }}></div>

                        <span onClick={handleLogOut} style={{ cursor: "pointer" }}>Log Out</span>
                        <br />
                    </>
                }
                <Link to="/UserGuide">User Guide</Link>
                <br />
                <Link to="/">Edit Word Lists</Link>
            </div>

            <div className="main-content" >
                <LoadWords user={user} showPrompt={showPrompt} setShowPrompt={setShowPrompt} promptMessage={promptMessage}
                    setPromptMessage={setPromptMessage} closeable={closeable} setCloseable={setCloseable}
                    setAnswerList={setAnswerList} setAllowedList={setAllowedList} />

                <p>Note: This tree is updated the last time compute was pressed, and does not auto-update upon logging in.</p>
                <br />
                {(bestTree === undefined || answerList.length === 0) 
                    ? <></> : <Tree bestTree={bestTree} len={answerList[0].word.length} />}
            </div>

            {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />}
        </>
    )

}