import { useState } from "react";

export default function TxtWordList({ setWordList, setLen, setPromptMessage, setShowPrompt }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        // Perform any additional actions with the selected file
        console.log("submitted");

        function onlyLetters(str) {
            return /^[A-Za-z]*$/.test(str);
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                const words = extractWords(contents);
                console.log(words);
                var list = []
                var l = words.length;
                var wordset = new Set();
                for (let i = 0; i < l; i++) {
                    var str = " Press the enter key or confirm to continue.";
                    if (!onlyLetters(words[i])) {
                        setPromptMessage(`Words to contain letters only, check word ${i}! ${str}`);
                        setShowPrompt(true);
                        return;
                    } else if (i < l - 1 && words[i].length != words[i + 1].length) {
                        setPromptMessage(`Word ${i} has a different number of letters from word ${i + 1}! ${str}`);
                        setShowPrompt(true);
                        return;
                    }
                    if (wordset.has(words[i])) {
                        setPromptMessage(`Be careful! There are repeated words in this list.`);
                        setShowPrompt(true);
                    }
                    wordset.add(words[i]);
                    list.push({ word: words[i], remove: false });
                }
                setLen(list[l - 1].word.length);
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
            <label>Upload TXT File</label>
            <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
            />
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
}