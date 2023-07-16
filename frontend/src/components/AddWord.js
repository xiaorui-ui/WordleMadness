import { useState } from "react";
import axios from 'axios';
import WordList from "./WordList.js";
import CustomPrompt from "./CustomPrompt.js";
import TxtWordList from "./TxtWordList.js";
import { BACKEND_ADD_WORDS, BACKEND_ADD_ALLOWED_WORDS } from "./Constants.js";

export default function AddWord({ wordList, setWordList, len,
  showPrompt, setShowPrompt, promptMessage, setPromptMessage, closeable, setCloseable,
  wordListFreq, setWordListFreq, user, id }) {

  const [word, setWord] = useState('');

  const addWordToBackendList = () => {
    const toArray = [word];
    axios.post(BACKEND_ADD_WORDS, { words: toArray }, { params: { username: user.name } })
      .then((response) => {
        setShowPrompt(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addWordToBackendAllowedList = () => {
    const toArray = [word];
    axios.post(BACKEND_ADD_ALLOWED_WORDS, { words: toArray }, { params: { username: user.name } })
      .then((response) => {
        setShowPrompt(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleWordChange = (event) => {
    setWord(event.target.value);
    // key in upper case in future
  }

  const changeRemove = (i) => {
    setWordList([
      ...wordList.slice(0, i),
      { word: wordList[i].word, remove: !wordList[i].remove },
      ...wordList.slice(i + 1)
    ]);
  }

  function onlyLetters(str) {
    return /^[A-Za-z]*$/.test(str);
  }

  const handleDismiss = () => {
    setShowPrompt(false);
  }

  const handleSubmit = (event) => {
    var str = " Press the enter key or confirm to continue.";
    event.preventDefault();

    setCloseable(false);
    setPromptMessage("Adding word...")
    setShowPrompt(true);
    
    if (!onlyLetters(word)) {
      setCloseable(true);
      setPromptMessage("Enter only letters!" + str);
      setShowPrompt(true);
      return;
    }

    // wordList is empty
    if (len === -1) {
      setWordList([{ word: word, remove: false }]);
      if (user.isLoggedIn) {
        if (id === 1) {
          addWordToBackendList();
        }
        else if (id === 2) {
          addWordToBackendAllowedList();
        }
      } else {
        setShowPrompt(false);
      }
      setWord('');
      return;
    }

    if (word.length !== len) {
      setCloseable(true);
      setPromptMessage(`Enter a word with ${len} letter(s)!${str}`);
      setShowPrompt(true);
      return;
    }

    // check for repeated words
    for (let i = 0; i < wordList.length; i++) {
      if (word === wordList[i].word) {
        setCloseable(true);
        setPromptMessage(`This word is already in the list. Enter a new word!${str}`);
        setShowPrompt(true);
        return;
      }
    }

    // if (wordListFreq.hasOwnProperty(word)) {
    //   setCloseable(true);
    //   setPromptMessage(`This word is already in the list. Enter a new word!${str}`);
    //   setShowPrompt(true);
    //   return;
    // }

    // wordListFreq[word] = 0;
    // wordListFreq[word] += 1;
    wordList.push({ word: word, remove: false });
    setWordList(wordList);
    if (user.isLoggedIn) {
      if (id === 1) {
        addWordToBackendList();
      }
      else if (id === 2) {
        addWordToBackendAllowedList();
      }
    } else {
      setShowPrompt(false);
    }
    setWord('');
  }

  return (
    <>
      <p>Add a word you want in your word list.</p>

      <form id="addWordForm" onSubmit={handleSubmit} data-testid="add-word-form">
        <input type="text" value={word} onChange={handleWordChange} data-testid="add-word-input" />
        <br />
        <button type="submit" data-testid="add-button">Add</button>
      </form >

      <p>OR</p>
      <br />
      <TxtWordList wordList={wordList} setWordList={setWordList} len={len} setPromptMessage={setPromptMessage} setShowPrompt={setShowPrompt}
        setCloseable={setCloseable} onlyLetters={onlyLetters} setWordListFreq={setWordListFreq} user={user} id={id} />
      {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}
      <WordList words={wordList} onWordChange={changeRemove} wordListFreq={wordListFreq} />
    </>
  )
}