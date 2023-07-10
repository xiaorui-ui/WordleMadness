import AddWord from "./AddWord.js";
import RemoveWords from "./RemoveWords.js";

export default function ModifyWords({ wordList, setWordList, len,
    showPrompt, setShowPrompt, promptMessage, setPromptMessage,
    closeable, setCloseable, wordListFreq, setWordListFreq, user, id }) {
    return (
        <>
            <AddWord wordList={wordList} setWordList={setWordList} len={len}
                showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                closeable={closeable} setCloseable={setCloseable}
                wordListFreq={wordListFreq} setWordListFreq={setWordListFreq}
                user={user} id={id}
                data-testid="add-word" />
            <div style={{ height: "30px" }}></div>

            <RemoveWords wordList={wordList} setWordList={setWordList}
                showPrompt={showPrompt} setShowPrompt={setShowPrompt}
                promptMessage={promptMessage} setPromptMessage={setPromptMessage}
                closeable={closeable} setCloseable={setCloseable}
                wordListFreq={wordListFreq} setWordListFreq={setWordListFreq}
                user={user} id={id}
                data-testid="remove-words" />
            <div style={{ height: "30px" }}></div>
        </>
    )
}