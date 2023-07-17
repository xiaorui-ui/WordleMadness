import { Link } from "react-router-dom";
import { BACKEND_COMPUTE } from "../components/Constants.js";
// import Username from "../components/Username.js";
import { useState } from "react";
import axios from 'axios';
import LoadWords from "../components/LoadWords.js";
import CustomPrompt from "../components/CustomPrompt.js";
import Tree from "../components/Tree.js"


export default function DecisionTree({ answerList, setAnswerList, allowedList, setAllowedList,
    user, handleLogOut, bestTree, setBestTree }) {

    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");
    const [closeable, setCloseable] = useState(true);

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    function subset(list1, list2) {
        let set = new Set(list2.map(element => element.word));
        console.log("Set:" + JSON.stringify([...set]));
        for (let i = 0; i < list1.length; i++) {
            if (!set.has(list1[i].word)) {
                setShowPrompt(true);
                setPromptMessage(`Word ${i + 1} of answer, ${list1[i].word}, is not present in allowed!`);
                return false;
            }
        }
        return true;
    }

    function checkValid(list1, list2) {
        if (!user.isLoggedIn) {
            setCloseable(true);
            setPromptMessage("Please login to use the decision tree!");
            setShowPrompt(true);
            return false;
        } else if (list1.length === 0 || list2.length === 0) {
            setCloseable(true);
            setPromptMessage("Lists cannot be empty!");
            setShowPrompt(true);
            return false;
        } else if (list1[0].word.length !== list2[0].word.length) {
            setCloseable(true);
            setPromptMessage("Words in lists need same number of letters!");
            setShowPrompt(true);
            return false;
        } else if (!subset(list1, list2)) {
            setCloseable(true);
            setPromptMessage("Answer needs to be subset of allowed!");
            setShowPrompt(true);
            return false;
        }
        return true;
    }

    const handleCompute = () => {
        setCloseable(false);
        setPromptMessage("Loading result...");
        setShowPrompt(true);
        // implement checks here
        if (!checkValid(answerList, allowedList)) {
            return;
        }
        axios.get(BACKEND_COMPUTE, {
            params: {
                username: user.name
            }
        }).then((response) => {
            console.log(response.data);
            setBestTree(response.data);
            console.log(response.data.w)
            var dict = response.data.child;
            console.log(dict);
            console.log(Object.keys(dict));
            for (let key in dict) {
                console.log(key);
                console.log(dict[key]);
            }
            setShowPrompt(false);
        }).catch((error) => {
            console.log(error);
        });
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

                <button className="button-3" onClick={handleCompute}>click me</button>
                <br />
                {(bestTree === undefined) ? <>boi</> : <Tree bestTree={bestTree} len={answerList[0].word.length} />}
            </div>

            {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />}
        </>
    )

}