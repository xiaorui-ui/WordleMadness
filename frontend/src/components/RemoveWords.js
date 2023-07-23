import axios from 'axios';
import CustomPrompt from './CustomPrompt';
import { BACKEND_REMOVE_WORDS, BACKEND_REMOVE_ALLOWED_WORDS } from './Constants';

export default function RemoveWords({ wordList, setWordList, showPrompt, setShowPrompt, promptMessage,
    setPromptMessage, closeable, setCloseable, wordListFreq, setWordListFreq, user, id }) {

    const removeWordsFromBackendList = (words) => {
        axios.patch(BACKEND_REMOVE_WORDS, { words: words.map(x => x.word) }, { params: { username: user.name } })
            .then((response) => {
                setShowPrompt(false);
            })
            .catch((error) => {
                setCloseable(true);
                setPromptMessage("Error syncing to backend! Please try again later.");
                setShowPrompt(true);
            });
    }

    const removeWordsFromBackendAllowedList = (words) => {
        axios.patch(BACKEND_REMOVE_ALLOWED_WORDS, { words: words.map(x => x.word) }, { params: { username: user.name } })
            .then((response) => {
                setShowPrompt(false);
            })
            .catch((error) => {
                setCloseable(true);
                setPromptMessage("Error syncing to backend! Please try again later.");
                setShowPrompt(true);
            });
    }

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    const handleRemoval = () => {
        setCloseable(false);
        setPromptMessage("Removing words...")
        setShowPrompt(true);
        var newArr = [...wordList.filter(word => !word.remove)];
        var removedArr = [...wordList.filter(word => word.remove)];

        if (user.isLoggedIn) {
            if (id === 1) {
                removeWordsFromBackendList(removedArr);
            }
            else if (id === 2) {
                removeWordsFromBackendAllowedList(removedArr);
            }
        } else {
            setShowPrompt(false);
        }

        setWordList(newArr);
    }

    const removeAll = () => {
        setCloseable(false);
        setPromptMessage("Removing all words...")
        setShowPrompt(true);
        if (user.isLoggedIn) {
            if (id === 1) {
                removeWordsFromBackendList(wordList);
            }
            else if (id === 2) {
                removeWordsFromBackendAllowedList(wordList);
            }
        } else {
            setShowPrompt(false);
        }

        setWordList(
            []
        );
        setWordListFreq({});

    }

    return (
        <>
            <button type="submit" onClick={handleRemoval} data-testid={"remove-selected"}
                className={id === 1 ? "button-1" : undefined}>
                Remove Selected </button>
            <div style={{ height: "30px" }}></div>
            <button type="submit" onClick={removeAll} data-testid={"remove-all"}
                className={id === 1 ? "button-1" : undefined}>
                Remove ALL </button>
            {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}
        </>
    )
}