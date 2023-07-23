import axios from 'axios';
import { useState } from "react";
import { BACKEND_ADD_WORDS, BACKEND_ADD_ALLOWED_WORDS } from "./Constants";

export default function TxtWordList({ wordList, setWordList, len, setPromptMessage, setShowPrompt, setCloseable,
    onlyLetters, setWordListFreq, user, id }) {

    const [selectedFile, setSelectedFile] = useState(null);

    function sameNumberLetters(list, str) {
        for (let i = 0; i < list.length - 1; i++) {
            if (list[i].length != list[i + 1].length) {
                setShowPrompt(true);
                setPromptMessage(`Word ${i + 1}, ${list[i + 1]}, and word ${i + 2}, ${list[i + 2]}, in the txt have 
                a different number of characters! ${str}`);
                setCloseable(true);
                return false;
            }
        }
        return true;
    }

    const addWordsToBackendList = (words) => {
        axios.post(BACKEND_ADD_WORDS, { words: words }, {
            params: { username: user.name },
        })
            .then((response) => {
                setShowPrompt(false);
            })
            .catch((error) => {
                setCloseable(true);
                setPromptMessage("Error syncing to backend! Please try again later.");
                setShowPrompt(true);
            });
    }

    const addWordsToBackendAllowedList = (words) => {
        axios.post(BACKEND_ADD_ALLOWED_WORDS, { words: words }, {
            params: { username: user.name },
        })
            .then((response) => {
                setShowPrompt(false);
            })
            .catch((error) => {
                setCloseable(true);
                setPromptMessage("Error syncing to backend! Please try again later.");
                setShowPrompt(true);
            });
    }

    const handleFileChange = (event) => {
        setCloseable(false);
        setPromptMessage("Adding words...")
        setShowPrompt(true);
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                const words = extractWords(contents).map(word => word.toLowerCase());
                console.log(words);
                const currentWords = wordList.map(word => word.word);
                var l = words.length;
                var list = [];
                var str = " Press the enter key or confirm to continue.";

                if (!sameNumberLetters(words, str)) {
                    return;
                }

                // check that all words in the file are valid
                for (let i = 0; i < l; i++) {
                    var nextWord = words[i];
                    if (!onlyLetters(nextWord)) {
                        setCloseable(true);
                        setPromptMessage(`Words to contain letters only, check word ${i + 1}, ${nextWord}! ${str}`);
                        setShowPrompt(true);
                        return;
                    } else if (len !== -1 && nextWord.length !== len) {
                        setCloseable(true);
                        setPromptMessage(`Word ${i + 1}, "${nextWord}" has a different number of letters from the current words in the list!`);
                        setShowPrompt(true);
                        return;
                    } else if (!(currentWords.includes(nextWord)) && !(words.slice(i + 1).includes(nextWord))) {
                        console.log(i);
                        list.push(nextWord);
                    }
                }

                // update words in backend if user is logged in
                if (user.isLoggedIn) {
                    if (id === 1) {
                        addWordsToBackendList(list);
                    }
                    else if (id === 2) {
                        addWordsToBackendAllowedList(list);
                    }
                } else {
                    setShowPrompt(false);
                }

                const newWords = wordList.concat(list.map((eachWord) => { return { word: eachWord, remove: false } }));

                setWordList(newWords);
            };
            reader.readAsText(file);
        };
    }

    function extractWords(contents) {
        const wordPattern = /\b\w+\b/g; // Regular expression to match words
        const matches = contents.match(wordPattern);
        return matches || [];
    }


    return (
        <div>
            <>Upload TXT File: </>
            <input
                id="file-upload"
                type="file"
                accept=".txt"
                onClick={e => (e.target.value = null)}
                onChange={handleFileChange}
                style={{ fontSize: "14px" }}
            />
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
}