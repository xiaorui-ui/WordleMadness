import "./styles.css";
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import Register from "./pages/Register.js"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo } from 'react';
import { DEFAULT_WORDS } from "./components/Constants";


export default function App() {

  // answer before allowed, ALWAYS!!!

  const savedUser = () => {
    const cache = sessionStorage.getItem("user");
    if (cache === null || cache === "") {
      return { isLoggedIn: false, name: "" };
    } else {
      return { isLoggedIn: true, name: cache };
    }
  }

  const [answerList, setAnswerList] = useState(DEFAULT_WORDS);

  const [allowedList, setAllowedList] = useState(DEFAULT_WORDS);

  const answerLength = useMemo(() => {
    if (answerList.length === 0) {
        return -1;
    }
    return answerList[0].word.length;
  }, [answerList]);

  const allowedLength = useMemo(() => {
    if (allowedList.length === 0) {
        return -1;
    }
    return allowedList[0].word.length;
  }, [allowedList]);

  const [user, setUser] = useState(savedUser());

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setUser({ name: "", isLoggedIn: false });
    setAnswerList(DEFAULT_WORDS);
    setAllowedList(DEFAULT_WORDS);
    alert("Logged out");
  }

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            answerLength={answerLength} allowedLength={allowedLength} allowedList={allowedList} setAllowedList={setAllowedList} 
            user={user} handleLogOut={handleLogOut} />} />

          <Route path="/Login" element={<Login setUser={setUser} />} />

          <Route path="/Register" element={<Register setUser={setUser} />} />

          <Route path="/DecisionTree" element={<DecisionTree answerList={answerList} setAnswerList={setAnswerList} 
            allowedList={allowedList} setAllowedList={setAllowedList} user={user} handleLogOut={handleLogOut} />} />

          <Route path="/UserGuide" element={<UserGuide user={user} handleLogOut={handleLogOut} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

