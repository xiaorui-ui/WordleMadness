import { useState } from "react";
import WordList from "./WordList.js";
import CustomPrompt from "./CustomPrompt.js";
import TxtWordList from "./TxtWordList.js";

export default function AddWord({ wordList, setWordList, len, setLen,
  showPrompt, setShowPrompt, promptMessage, setPromptMessage,
  wordListFreq, setWordListFreq, user, id }) {

  const BACKEND_ADD_WORD = "http://localhost:8080/backend/addWord";
  const BACKEND_ADD_ALLOWED_WORD = "http://localhost:8080/backend/addAllowedWord";

  const [word, setWord] = useState('');


  const handleWordChange = (event) => {
    setWord(event.target.value);
    // key in upper case in future
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

    if (word.length !== len) {
      setPromptMessage(`Enter a word with ${len} letter(s)!${str}`);
      setShowPrompt(true);
      return;
    }

    // check for repeated words
    for (let i = 0; i < wordList.length; i++) {
      if (word === wordList[i].word) {
        setShowPrompt(true);
        setPromptMessage(`This word is already in the list. Enter a new word!${str}`);
        return;
      }
    }

    // if (wordListFreq.hasOwnProperty(word)) {
    //   setShowPrompt(true);
    //   setPromptMessage(`This word is already in the list. Enter a new word!${str}`);
    //   return;
    // }

    // wordListFreq[word] = 0;
    // wordListFreq[word] += 1;
    wordList.push({ word: word, remove: false });
    setWordList(wordList);

    

    // placeholder code block, variable wordList
    if (user.loggedIn) {
      if (id === 1) {
        axios.patch(BACKEND_ADD_WORD, {}, { params: { name: user.name, word: word, remove: false } })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
      }
      else if (id === 2) {
        axios.patch(BACKEND_ADD_ALLOWED_WORD, {}, { params: { name: user.name, word: word, remove: false } })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
      }
    }


    console.log(`submission handled`);
    console.log(wordListFreq);
    setWord('');
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

      <form id="addWordForm" onSubmit={handleSubmit} data-testid="add-word-form">
        <input type="text" value={word} onChange={handleWordChange} data-testid="add-word-input" />
        <br />
        <button type="submit" data-testid="add-button">Add</button>
      </form >

      <p>OR</p>
      <br />
      <TxtWordList setWordList={setWordList} setLen={setLen} setPromptMessage={setPromptMessage} setShowPrompt={setShowPrompt}
        onlyLetters={onlyLetters} setWordListFreq={setWordListFreq} user={user} id={id} />
      {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} />)}
      <WordList words={wordList} onWordChange={changeRemove} wordListFreq={wordListFreq} />
    </>
  )
}