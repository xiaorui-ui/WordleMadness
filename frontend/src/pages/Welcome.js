import "../styles.css";
import { useState } from "react";
import Header from "../components/Header.js";
import Compute from "../components/Compute";
import ModifyWords from "../components/ModifyWords";

// to do: create a pages bar on the left, like in nerdtree


export default function Welcome() {

    const defaultWords = [
        { word: "crane", remove: false },
        { word: "jazzy", remove: true },
        { word: "fjord", remove: false }
    ];

    // All words in list must have length len
    const [len, setLen] = useState(5);

    const [answerList, setAnswerList] = useState(defaultWords);

    const [answerListFreq, setAnswerListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [allowedList, setAllowedList] = useState(defaultWords);

    const [allowedListFreq, setAllowedListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [differentList, setDifferentList] = useState(true);

    const [promptMessage, setPromptMessage] = useState(defaultWords);

    const [showPrompt, setShowPrompt] = useState(false);

    const handleClick = () => {
        setDifferentList(!differentList);
    }


    return (
        <>
            <Header />
            <main>
                <h2>Answer List</h2>
                <ModifyWords wordList={answerList} setWordList={setAnswerList} len={len} setLen={setLen}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                    wordListFreq={answerListFreq} setWordListFreq={setAnswerListFreq} />


                <button type="click" onClick={handleClick}> Set lists to {differentList ? 'different' : 'same'} </button>

                <h2>Allowed List({differentList ? 'Different' : 'Same'} from answer list)</h2>


                {differentList &&
                    (<>
                        <ModifyWords wordList={allowedList} setWordList={setAllowedList} len={len} setLen={setLen}
                            showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                            promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                            wordListFreq={allowedListFreq} setWordListFreq={setAllowedListFreq} />
                    </>)
                }

                <Compute wordList={answerList} />
                <div style={{ height: "30px" }}></div>

                <a href="/userGuide">User Guide</a>
                <div style={{ height: "30px" }}></div>

                <a href="/Login">Login to save your data</a>
            </main>
        </>
    );
}