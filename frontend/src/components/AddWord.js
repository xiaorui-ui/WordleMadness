import { useState } from "react";
import WordList from "./WordList";

export default function AddWord({ wordList, setWordList, len, setLen }) {

  const [word, setWord] = useState('');


  const handleWordChange = (event) => {
    setWord(event.target.value);
  }


  function onlyLetters(str) {
    return /^[A-Za-z]*$/.test(str);
  }

  const handleSubmit = (event) => {
    var str = " Press enter to continue";
    event.preventDefault();
    if (!onlyLetters(word)) {
      return prompt("Enter a word with letters only!" + str);
    }

    // wordList is empty
    if (len === -1) {
      setWordList([{ word: word, remove: false }]);
      setLen(word.length);
      setWord('');
      return;
    }

    if (word.length === len) {
      setWordList(
        [...wordList,
        { word: word, remove: false }
        ]
      );
      console.log("submission handled");
      setWord('');
    }
    else {
      prompt("Enter a word with " + len + " letters!" + str);
    }
  }

  const changeRemove = (i) => {
    setWordList([
      ...wordList.slice(0, i),
      { word: wordList[i].word, remove: !wordList[i].remove },
      ...wordList.slice(i + 1)
    ]);
  }

  return (
    <>
      <p>Add a word you want in your word list.</p>

      <form id="addWordForm" onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={handleWordChange} />
        <button type="submit">Add</button>
      </form>
      <WordList words={wordList} onWordChange={changeRemove}></WordList>
    </>
  )
}