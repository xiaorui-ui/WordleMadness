import "../styles.css";
import { useState } from "react";
import Header from "../components/Header.js";
import Compute from "../components/Compute.js";
import ModifyWords from "../components/ModifyWords.js";

// to do: create a pages bar on the left, like in nerdtree


export default function Welcome({ answerList, setAnswerList, allowedList, setAllowedList, user }) {

    function f(wordList) {
        if (wordList.length === 0) {
            return -1;
        }
        return wordList[0].word.length;
    }

    // All words in list must have length len

    const [len1, setLen1] = useState(f(answerList));

    const [len2, setLen2] = useState(f(allowedList));

    const [answerListFreq, setAnswerListFreq] = useState({
        "crane": 1, "jazzy": 1, "fjord": 1
    });

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
            <Header user={user} />
            <main>
                <h2>Answer List</h2>
                <ModifyWords wordList={answerList} setWordList={setAnswerList} len={len1} setLen={setLen1}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                    wordListFreq={answerListFreq} setWordListFreq={setAnswerListFreq}
                    user={user} id={1} />
                {/* Id differentiates between lists 1 and 2 in the BE */}


                <button type="click" onClick={handleClick} data-testid="set-same-diff">
                    Set lists to {differentList ? 'same' : 'different'} </button>

                <h2>Allowed List {differentList ? 'Different from' : 'Same as'} answer list</h2>


                {differentList &&
                    (<>
                        <ModifyWords wordList={allowedList} setWordList={setAllowedList} len={len2} setLen={setLen2}
                            showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                            promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                            wordListFreq={allowedListFreq} setWordListFreq={setAllowedListFreq}
                            user={user} id={2} />
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