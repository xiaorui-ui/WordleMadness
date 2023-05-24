import "./styles.css";
import {useState} from "react";
import Header from "./components/Header.js";
import AddWord from "./components/AddWord";
// import {AddWord} from "./components/AddWord.js";



export default function App() {
  return (
    <div className="App">
      <Header/>
      <main>
        <AddWord/>
      </main>
    </div>
  );
}

