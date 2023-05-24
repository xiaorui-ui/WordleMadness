export default function RemoveWords({ wordList, setWordList }) {

    const handleRemoval = () => {
        setWordList(
            [...wordList.filter(word => !word.remove)]
        );
    }

    const removeAll = () => {
        setWordList(
            []
        );
    }

    return (
        <>
            <button type="submit" onClick={handleRemoval}> Remove Selected </button>
            <button type="submit" onClick={removeAll}> Remove ALL </button>
        </>
    )
}