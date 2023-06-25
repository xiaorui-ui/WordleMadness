import { useState } from "react";

export default function TxtWordList({ setWordList, setLen, setPromptMessage, setShowPrompt, onlyLetters,
    setWordListFreq, user, id }) {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log("submitted");

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                const words = extractWords(contents);
                console.log(words);
                var list = []
                var freq = {};
                var l = words.length;
                var str = " Press the enter key or confirm to continue.";
                for (let i = 0; i < l; i++) {
                    if (!onlyLetters(words[i])) {
                        setPromptMessage(`Words to contain letters only, check word ${i}! ${str}`);
                        setShowPrompt(true);
                        return;
                    } else if (i < l - 1 && words[i].length !== words[i + 1].length) {
                        setPromptMessage(`Word ${i} has a different number of letters from word ${i + 1}! ${str}`);
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
                    for (let j = 0; j < i; j++) {
                        if (words[i] === words[j]) {
                            setPromptMessage(`Word ${i} has appeared in the list before.`);
                            setShowPrompt(true);
                            return;
                        }
                    }
                    list.push({ word: words[i], remove: false });
                }
                // console.log(freq);
                // setWordListFreq(freq);
                setLen(list[l - 1].word.length);

                // insert post request here, variable list
                // placeholder code block
                if (user.loggedIn) {
                    if (id === 1) {
                        // modify answerList
                    }
                    else if (id === 2) {
                        // modify allowedList
                    }
                }

                setWordList(list);
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