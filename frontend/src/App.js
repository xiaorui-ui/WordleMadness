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
    { word: "fjord", remove: false },
    { word: "found", remove: false }
  ];

  // answer before allowed, ALWAYS!!!

  const [answerList, setAnswerList] = useState(defaultWords);

  const [allowedList, setAllowedList] = useState(defaultWords);

  const [user, setUser] = useState({ loggedIn: false, userName: "" });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            allowedList={allowedList} setAllowedList={setAllowedList} user={user} />} />

          <Route path="/login" element={<Login setAns={setAnswerList} setAllowed={setAllowedList}
            setUser={setUser} />} />

          <Route path="/decisionTree" element={<DecisionTree answerList={answerList} allowedList={allowedList} />} />

          <Route path="/userGuide" element={<UserGuide />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

