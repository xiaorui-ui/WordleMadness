export default function RemoveWords({ wordList, setWordList, setLen, wordListFreq, setWordListFreq }) {

    const handleRemoval = () => {
        // modify the frequency map
        // modify the list
        for (let i = 0; i < wordList.length; i++) {
            var word = wordList[i];
            if (word.remove) {
                if (wordListFreq[word.word] === 1) {
                    delete wordListFreq[word.word];
                } else {
                    wordListFreq[word.word] -= 1;
                }
            }
        }
        console.log(wordListFreq);
        var newArr = [...wordList.filter(word => !word.remove)]
        setWordList(newArr);
        if (newArr.length === 0) {
            setLen(-1);
        }
    }

    const removeAll = () => {
        setWordList(
            []
        );
        setLen(-1);
        setWordListFreq({});
    }

    return (
        <>
            <button type="submit" onClick={handleRemoval} data-testid={"remove-selected"}> Remove Selected </button>
            <div style={{ height: "30px" }}></div>
            <button type="submit" onClick={removeAll} data-testid={"remove-all"}> Remove ALL </button>
        </>
    )
}