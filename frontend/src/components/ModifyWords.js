import AddWord from "./AddWord";
import RemoveWords from "./RemoveWords";

export default function ModifyWords({ wordList, setWordList, len, setLen,
    showPrompt, setShowPrompt, promptMessage, setPromptMessage,
    wordListFreq, setWordListFreq }) {
    return (
        <>
            <AddWord wordList={wordList} setWordList={setWordList} len={len} setLen={setLen}
                showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                wordListFreq={wordListFreq} setWordListFreq={setWordListFreq} />
            <div style={{ height: "30px" }}></div>

            <RemoveWords wordList={wordList} setWordList={setWordList} setLen={setLen}
                wordListFreq={wordListFreq} setWordListFreq={setWordListFreq} />
            <div style={{ height: "30px" }}></div>
        </>
    )
}