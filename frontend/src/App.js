import "./styles.css";
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from 'react';


export default function App() {

  const defaultWords = [
    { word: "crane", remove: false },
    { word: "jazzy", remove: true },
    { word: "fjord", remove: false }
  ];

  const [wordList, setWordList] = useState(defaultWords);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome wordList={wordList} />} />
          <Route path="/login" element={<Login setWordList={setWordList} />} />
          <Route path="/decisionTree" element={<DecisionTree />} />
          <Route path="/userGuide" element={<UserGuide />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

