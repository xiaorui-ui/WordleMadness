import "./styles.css";
import { useState } from "react";
import Header from "./components/Header.js";
import AddWord from "./components/AddWord";
import RemoveWords from "./components/RemoveWords";
import Compute from "./components/Compute";


export default function App() {

  const defaultWords = [
    { word: "crane", remove: false },
    { word: "trace", remove: true }
  ];

  const [len, setLen] = useState(5);

  const [wordList, setWordList] = useState(defaultWords);


  return (
    <div className="App">
      <Header />
      <main>
        <AddWord wordList={wordList} setWordList={setWordList} len={len} setLen={setLen} />
        <RemoveWords wordList={wordList} setWordList={setWordList} setLen={setLen} />
        <Compute wordList={wordList} />
        {/* We will allow txt addition of the wordList later */}
      </main>
    </div>
  );
}

