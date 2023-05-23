import "./styles.css";
import {useState} from "react";



export default function App() {

  const len = 5; // throw an exception if the new word has a different length
  
  const arr = [
    {index: 0, word: "crane", remove: <input type="checkbox" checked={true} />},
    {index: 1, word: "trace", remove: <input type="checkbox" checked={true} />},
    {index: 2, word: "fjord", remove: <input type="checkbox" checked={false} />},
  ];

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
        {index: wordList.length, word: word, remove: <input type="checkbox" checked={false} />}
      ]
    );
    setWord('');
  }

  return (
    <div className="App">
      <header>
        <h1>Wordle Solver</h1>
      </header>
      <main>
        <h2>Add some words you want in your word list.</h2>

        <form id = "addWordForm">
          {/* <input type="text" value = {word} onClick = {handleWordChange}/>
          <button type="submit" onClick = {handleSubmit}>Add</button> */}
          <input type="text" value = {word} onChange = {handleWordChange}/>
          <button type="submit" onClick = {handleSubmit}>Add</button>
        </form>

        <h1>Word List</h1>
        <table>
          <tr>
            <th>Any heading</th>
            <th>word</th>
            <th>remove</th>
          </tr>

          {wordList.map((val, key) => {
              return (
                  <tr key={key}>
                      <td>{val.index}</td>
                      <td>{val.word}</td>
                      <td>{val.remove}</td>
                  </tr>
              )
          })}

        </table>
      </main>
    </div>
  );
}

