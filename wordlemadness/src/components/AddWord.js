import {useState} from "react";
import "../styles.css";
import WordList from "./WordList";

export default function AddWord() {
    const len = 5; // throw an exception if the new word has a different length
  
    const arr = [];
  
    const [word, setWord] = useState('');
    const [wordList, setWordList] = useState(arr);
  
  
    const handleWordChange = (event) => {
      setWord(event.target.value);
    }
  
    // remove is false by default
    const handleSubmit = (event) => {
      event.preventDefault();
      setWordList(
        [... wordList,
          {word: word, remove : false}
        ]
      );
      console.log("submission handled");
      setWord('');
    }

    const changeRemove = (i) => {
      setWordList([
        ...wordList.slice(0, i),
        {word: wordList[i].word, remove: !wordList[i].remove},
        ...wordList.slice(i + 1)
      ])
    }

    return(
        <div className="App">
            <p>Add some words you want in your word list.</p>

            <form id = "addWordForm" onSubmit = {handleSubmit}>
                <input type="text" value = {word} onChange = {handleWordChange}/>
                <button type="submit">Add</button>
            </form>
            <WordList words = {wordList} onWordChange = {changeRemove}></WordList>
        </div>
    )
}