import axios from 'axios';
import { BACKEND_REMOVE_WORD, BACKEND_REMOVE_ALLOWED_WORD } from './Constants';

export default function RemoveWords({ wordList, setWordList, setLen, wordListFreq, setWordListFreq
    , user, id }) {

    const removeWordFromBackendList = (word) => {
        axios.patch(BACKEND_REMOVE_WORD, {}, { params: { username: user.name, word: word.word } })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const removeWordFromBackendAllowedList = (word) => {
        axios.patch(BACKEND_REMOVE_ALLOWED_WORD, {}, { params: { username: user.name, word: word.word } })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

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
        var newArr = [...wordList.filter(word => !word.remove)]

        if (user.loggedIn) {
            if (id === 1) {
                for (let i = 0; i < wordList.length; i++) {
                    word = wordList[i];
                    if (word.remove) {
                        removeWordFromBackendList(word);
                    }
                }
            }
            else if (id === 2) {
                for (let i = 0; i < wordList.length; i++) {
                    word = wordList[i];
                    if (word.remove) {
                        removeWordFromBackendAllowedList(word);
                    }
                }
            }
        }

        setWordList(newArr);
        if (newArr.length === 0) {
            setLen(-1);
        }
    }

    const removeAll = () => {

        if (user.loggedIn) {
            if (id === 1) {
                for (let i = 0; i < wordList.length; i++) {
                    word = wordList[i];
                    removeWordFromBackendList(word);
                }
            }
            else if (id === 2) {
                for (let i = 0; i < wordList.length; i++) {
                    word = wordList[i];
                    removeWordFromBackendAllowedList(word);
                }
            }
        }

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