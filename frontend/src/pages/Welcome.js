import "../styles.css";
import { useState } from "react";
import Header from "../components/Header.js";
import Compute from "../components/Compute.js";
import ModifyWords from "../components/ModifyWords.js";

// to do: create a pages bar on the left, like in nerdtree


export default function Welcome({ wordList }) {

    function f(wordList) {
        if (wordList.length === 0) {
            return -1;
        }
        return wordList[0].length;
    }

    // All words in list must have length len

    const [len, setLen] = useState(f(wordList));

    const [answerList, setAnswerList] = useState(wordList);

    const [answerListFreq, setAnswerListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [allowedList, setAllowedList] = useState(wordList);

    const [allowedListFreq, setAllowedListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

    const [differentList, setDifferentList] = useState(true);

    const [promptMessage, setPromptMessage] = useState('');

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


                <button type="click" onClick={handleClick} data-testid="set-same-diff">
                    Set lists to {differentList ? 'same' : 'different'} </button>

                <h2>Allowed List({differentList ? 'Different from' : 'Same as'} answer list)</h2>


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