import { useState } from "react";
import WordList from "./WordList";
import CustomPrompt from "./CustomPrompt";
import TxtWordList from "./TxtWordList";

export default function AddWord({ wordList, setWordList, len, setLen,
  showPrompt, setShowPrompt, promptMessage, setPromptMessage }) {

  const [word, setWord] = useState('');


  const handleWordChange = (event) => {
    setWord(event.target.value);
    // cannot key in upper-case atm, so no need to change
  }


  function onlyLetters(str) {
    return /^[A-Za-z]*$/.test(str);
  }

  const handleDismiss = () => {
    setShowPrompt(false);
  }

  const handleSubmit = (event) => {
    var str = " Press the enter key or confirm to continue";
    event.preventDefault();
    if (!onlyLetters(word)) {
      setShowPrompt(true);
      setPromptMessage("Enter only letters!" + str);
      return;
    }

    // wordList is empty
    if (len === -1) {
      setWordList([{ word: word, remove: false }]);
      setLen(word.length);
      setWord('');
      return;
    }

    if (word.length === len) {
      // don't allow submission if the word is already in the list
      for (let i = 0; i < wordList.length; i++) {
        console.log(word + ", " + wordList[i].word);
        if (word === wordList[i].word) {
          setShowPrompt(true);
          setPromptMessage(`This word is identical to word ${i}. Be careful!`);
        }
      }
      setWordList(
        [...wordList,
        { word: word, remove: false }
        ]
      );
      console.log("submission handled");
      setWord('');
    }
    else {
      setPromptMessage("Enter a word with " + len + " letter(s)!" + str);
      setShowPrompt(true);
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
        <br />
        <button type="submit">Add</button>
      </form>

      <p>OR</p>
      <br />
      <TxtWordList setWordList={setWordList} setLen={setLen} setPromptMessage={setPromptMessage} setShowPrompt={setShowPrompt} />
      {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} />)}
      <WordList words={wordList} onWordChange={changeRemove} />
    </>
  )
}