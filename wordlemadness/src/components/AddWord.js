import { useState } from "react";
import WordList from "./WordList";

export default function AddWord({ wordList, setWordList, len }) {

  const [word, setWord] = useState('');


  const handleWordChange = (event) => {
    setWord(event.target.value);
  }


  function onlyLetters(str) {
    return /^[A-Za-z]*$/.test(str);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (word.length === len) {
      if (onlyLetters(word)) {
        setWordList(
          [...wordList,
          { word: word, remove: false }
          ]
        );
        console.log("submission handled");
        setWord('');
      } else {
        prompt("Enter a word with letters only!");
      }
    } else {
      prompt("Enter a word with " + len + " characters");
    }
  }

  const changeRemove = (i) => {
    setWordList([
      ...wordList.slice(0, i),
      { word: wordList[i].word, remove: !wordList[i].remove },
      ...wordList.slice(i + 1)
    ])
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