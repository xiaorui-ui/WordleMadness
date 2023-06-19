import "../styles.css";
import { useState } from "react";
import Header from "../components/Header.js";
import AddWord from "../components/AddWord";
import RemoveWords from "../components/RemoveWords";
import TxtWordList from "../components/TxtWordList";
import Compute from "../components/Compute";

// to do: create a pages bar on the left, like in nerdtree


export default function Welcome() {

    const defaultWords = [
        { word: "crane", remove: false },
        { word: "jazzy", remove: true },
        { word: "fjord", remove: false },
        { Word: "trace", remove: false }
    ];

    const [len, setLen] = useState(5);

    const [wordList, setWordList] = useState(defaultWords);

    const [promptMessage, setPromptMessage] = useState("");

    const [showPrompt, setShowPrompt] = useState(false);



    return (
        <>
            <Header />
            <main>
                <AddWord wordList={wordList} setWordList={setWordList} len={len} setLen={setLen}
                    showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                    promptMessage={promptMessage} setPromptMessage={setPromptMessage} />
                <div style={{ height: "30px" }}></div>

                <RemoveWords wordList={wordList} setWordList={setWordList} setLen={setLen} />
                <div style={{ height: "30px" }}></div>

                <Compute wordList={wordList} />
                <div style={{ height: "30px" }}></div>

                <a href="/userGuide">User Guide</a>
                <div style={{ height: "30px" }}></div>

                <a href="/Login">Login to save your data</a>
            </main>
        </>
    );
}