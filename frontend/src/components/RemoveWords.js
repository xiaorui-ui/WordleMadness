export default function RemoveWords({ wordList, setWordList, setLen }) {

    const handleRemoval = () => {
        var newArr = [...wordList.filter(word => !word.remove)]
        setWordList(newArr);
        if (newArr.length == 0) {
            setLen(-1);
        }
    }

    const removeAll = () => {
        setWordList(
            []
        );
        setLen(-1);
    }

    return (
        <>
            <button type="submit" onClick={handleRemoval}> Remove Selected </button>
            <br />
            <button type="submit" onClick={removeAll}> Remove ALL </button>
        </>
    )
}