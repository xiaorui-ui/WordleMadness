import { Link } from "react-router-dom";
// import Username from "../components/Username.js";
import { useState } from "react";
import LoadWords from "../components/LoadWords.js";
import CustomPrompt from "../components/CustomPrompt.js";
import Tree from "../components/DecisionTree/Tree.js";


export default function DecisionTree({ answerList, setAnswerList, allowedList, setAllowedList,
    user, handleLogOut, bestTree, setBestTree, loadingPrompt, setLoadingPrompt }) {

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
                        <Link to="/Login">Login to use decision tree</Link>
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
                {/* <LoadWords user={user} showPrompt={showPrompt} setShowPrompt={setShowPrompt} promptMessage={promptMessage}
                    setPromptMessage={setPromptMessage} closeable={closeable} setCloseable={setCloseable}
                    setAnswerList={setAnswerList} setAllowedList={setAllowedList} /> 
                    setAnswerList={setAnswerList} setAllowedList={setAllowedList} loadingPrompt={loadingPrompt}
                    setLoadingPrompt={setLoadingPrompt} />  */}

                <p>Note: This tree is updated the last time compute was pressed within your account,
                    and <i>does not</i> auto-update upon logging in.</p>
                <br />
                {(bestTree === "" || answerList.length === 0) ? <>Compute or log in to get tree!</> : <Tree bestTree={bestTree} />}
            </div>

            {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />}
        </>
    )

}