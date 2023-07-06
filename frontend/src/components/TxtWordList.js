import axios from 'axios';
import { useState } from "react";
import { BACKEND_ADD_WORDS, BACKEND_ADD_ALLOWED_WORDS } from "./Constants";

export default function TxtWordList({ wordList, setWordList, len, setLen, setPromptMessage, setShowPrompt, onlyLetters,
    setWordListFreq, user, id }) {

    const [selectedFile, setSelectedFile] = useState(null);

    const addWordsToBackendList = (words) => {
        axios.patch(BACKEND_ADD_WORDS, {}, { params: { username: user.name, words: words.join(",") } })
            .catch((error) => {
                console.log(error);
            });
    }

    const addWordsToBackendAllowedList = (words) => {
        axios.patch(BACKEND_ADD_ALLOWED_WORDS, {}, { params: { username: user.name, words: words.join(",") } })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                const words = extractWords(contents);
                // var freq = {};
                var l = words.length;
                var list = [];
                var str = " Press the enter key or confirm to continue.";
                for (let i = 0; i < l; i++) {
                    if (!onlyLetters(words[i])) {
                        setPromptMessage(`Words to contain letters only, check word ${i + 1}! ${str}`);
                        setShowPrompt(true);
                        return;
                    } else if (len !== -1 && words[i].length !== len) {
                        setPromptMessage(`Word ${i + 1}, "${words[i]}" has a different number of letters from the current words in the list!`);
                        setShowPrompt(true);
                        return;
                    }
                    // else if (freq.hasOwnProperty(words[i])) {
                    //     // for now, we disallow the addition of new words
                    //     setPromptMessage(`Word ${i} has appeared in the list before.`);
                    //     setShowPrompt(true);
                    //     return;
                    // }
                    // freq[words[i]] = 0;
                    // freq[words[i]] += 1;

                    list.push({ word: words[i], remove: false });
                }
                for (let j = 0; j < wordList.length; j++) {
                    list.push(wordList[j]);
                }
                for (let m = 0; m < list.length; m++) {
                    for (let n = 0; n < m; n++) {
                        const mstring = list[m].word;
                        const nstring = list[n].word;
                        if (mstring === nstring) {
                            setPromptMessage(`Word ${list[n].word} is repeated!`);
                            setShowPrompt(true);
                            return;
                        } else if (mstring.length !== nstring.length) {
                            setPromptMessage(`Words submitted have different length!`);
                            setShowPrompt(true);
                            return;
                        }
                    }
                }
                // console.log(freq);
                // setWordListFreq(freq);

                // Valid words submitted
                if (user.isLoggedIn) {
                    if (id === 1) {
                        addWordsToBackendList(words);
                    }
                    else if (id === 2) {
                        addWordsToBackendAllowedList(words);
                    }
                }

                setWordList(list);
                if (len === -1) {
                    setLen(words[l - 1].length);
                }
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
                onChange={handleFileChange}
            />
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
}