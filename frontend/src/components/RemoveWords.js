import axios from 'axios';
import { BACKEND_REMOVE_WORDS, BACKEND_REMOVE_ALLOWED_WORDS } from './Constants';

export default function RemoveWords({ wordList, setWordList, setLen, wordListFreq, setWordListFreq
    , user, id }) {

    const removeWordsFromBackendList = (words) => {
        axios.patch(BACKEND_REMOVE_WORDS, {}, { params: { username: user.name, words: words.map(x => x.word).join(",") } })
            .catch((error) => {
                console.log(error);
            });
    }

    const removeWordsFromBackendAllowedList = (words) => {
        axios.patch(BACKEND_REMOVE_ALLOWED_WORDS, {}, { params: { username: user.name, words: words.map(x => x.word).join(",") } })
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
        var newArr = [...wordList.filter(word => !word.remove)];
        var removedArr = [...wordList.filter(word => word.remove)];

        if (user.isLoggedIn) {
            if (id === 1) {
                removeWordsFromBackendList(removedArr);
            }
            else if (id === 2) {
                removeWordsFromBackendAllowedList(removedArr);
            }
        }

        setWordList(newArr);
        if (newArr.length === 0) {
            setLen(-1);
        }
    }

    const removeAll = () => {

        if (user.isLoggedIn) {
            if (id === 1) {
                removeWordsFromBackendList(wordList);
            }
            else if (id === 2) {
                removeWordsFromBackendAllowedList(wordList);
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