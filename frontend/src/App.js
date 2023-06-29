import "./styles.css";
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import Register from "./pages/Register.js"
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

  const [user, setUser] = useState({ isLoggedIn: false, name: "" });

  const handleLogOut = () => {
    setUser({ name: "", isLoggedIn: false });
    alert("Logged out");
    // reset the word lists to default
    // should we do that?
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            allowedList={allowedList} setAllowedList={setAllowedList} user={user} handleLogOut={handleLogOut} />} />

          <Route path="/Login" element={<Login setAns={setAnswerList} setAllowed={setAllowedList}
            setUser={setUser} />} />

          <Route path="/DecisionTree" element={<DecisionTree answerList={answerList} allowedList={allowedList} user={user}
            handleLogOut={handleLogOut} />} />

          <Route path="/UserGuide" element={<UserGuide user={user} setUser={setUser} handleLogOut={handleLogOut} />} />

          <Route path="/Register" element={<Register setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

