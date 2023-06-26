import axios from 'axios';

export default function RemoveWords({ wordList, setWordList, setLen, wordListFreq, setWordListFreq
    , user, id }) {

    const BACKEND_REMOVE_WORD = "http://localhost:8080/backend/deleteWord";
    const BACKEND_REMOVE_ALLOWED_WORD = "http://localhost:8080/backend/deleteAllowedWord";

    const handleRemoval = () => {
        // modify the frequency map
        // modify the list

        // for (let i = 0; i < wordList.length; i++) {
        //     var word = wordList[i];
        //     if (word.remove) {
        //         if (wordListFreq[word.word] === 1) {
        //             delete wordListFreq[word.word];
        //         } else {
        //             wordListFreq[word.word] -= 1;
        //         }
        //     }
        // }
        console.log(wordListFreq);
        var newArr = [...wordList.filter(word => !word.remove)]

        if (user.loggedIn) {
            if (id === 1) {
                wordList.forEach(word => {
                    axios.patch(BACKEND_REMOVE_WORD, {}, { params: { username: user.name, word: word.word } })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
                });
            }
            else if (id === 2) {
                wordList.forEach(word => {
                    axios.patch(BACKEND_REMOVE_ALLOWED_WORD, {}, { params: { username: user.name, word: word.word } })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
                });
            }
        }

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

        // ergo anywhere to set word list to []
        if (user.loggedIn) {
            if (id === 1) {
                // modify answerList
            }
            else if (id === 2) {
                // modify allowedList
            }
        }
    }

    return (
        <>
            <button type="submit" onClick={handleRemoval} data-testid={"remove-selected"}> Remove Selected </button>
            <div style={{ height: "30px" }}></div>
            <button type="submit" onClick={removeAll} data-testid={"remove-all"}> Remove ALL </button>
        </>
    )
}