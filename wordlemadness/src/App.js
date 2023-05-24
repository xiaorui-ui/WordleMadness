import "./styles.css";
import {useState} from "react";
import Header from "./components/Header.js";
import AddWord from "./components/AddWord";
import RemoveWords from "./components/RemoveWords";
// import {AddWord} from "./components/AddWord.js";



export default function App() {

  const words = [
    {word: "crane", remove: false}, 
    {word: "trace", remove: true}
  ];

  const len = 5;

  const [wordList, setWordList] = useState(words);


  return (
    <div className="App">
      <Header/>
      <main>
        <AddWord wordList = {wordList} setWordList = {setWordList} len = {len}/>
        <RemoveWords  wordList = {wordList} setWordList = {setWordList}/>
      </main>
    </div>
  );
}

