import { Link } from "react-router-dom";
import { BACKEND_COMPUTE } from "../components/Constants.js";
// import Username from "../components/Username.js";
import { useState } from "react";
import axios from 'axios';
import CustomPrompt from "../components/CustomPrompt.js";


export default function DecisionTree({ answerList, allowedList, user, handleLogOut }) {

    const [bestWord, setBestWord] = useState("boi");

    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    function subset(list1, list2) {
        let set = new Set(list2.map(element => element.word));
        console.log("Set:" + JSON.stringify([...set]));
        for (const w of list1) {
            if (!set.has(w.word)) {
                return false;
            }
        }
        return true;
    }

    function checkValid(list1, list2) {
        if (list1.length === 0 || list2.length === 0) {
            setShowPrompt(true);
            setPromptMessage("Lists cannot be empty!");
        } else if (list1[0].word.length !== list2[0].word.length) {
            setShowPrompt(true);
            setPromptMessage("Words in lists need same number of letters!");
        } else if (!subset(list1, list2)) {
            setShowPrompt(true);
            setPromptMessage("Answer needs to be subset of allowed!");
        }
    }




    const handleCompute = () => {
        // implement checks here
        checkValid(answerList, allowedList);
        axios.get(BACKEND_COMPUTE, {
            params: {
                username: user.name
            }
        }).then((response) => {
            setBestWord(response.data);
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
                <button onClick={handleCompute}>click me</button>
                <p>{bestWord}</p>
            </div>

            {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} />}
        </>
    )

}