import "./styles.css";
import axios from 'axios';
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import Register from "./pages/Register.js"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import { BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, DEFAULT_WORDS } from "./components/Constants";


export default function App() {

  // answer before allowed, ALWAYS!!!

  // to implement: allow word list to be retained, even if the user is signed out

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

  const [user, setUser] = useState(savedUser());

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    setUser({ name: "", isLoggedIn: false });
    setAnswerList(DEFAULT_WORDS);
    setAllowedList(DEFAULT_WORDS);
    alert("Logged out");
  }

  useEffect(() => {
    if (!user || user.name === "") {
      // use the sessionStorage here
      setAnswerList(DEFAULT_WORDS);
      setAllowedList(DEFAULT_WORDS);
      return;
    }
    axios.get(BACKEND_GET_WORD_LIST, { params: { username: user.name } })
      .then((response) => {
        const ansList = response.data.map(str => { return { word: str, remove: false } });
        setAnswerList(ansList);
      })
      .catch((error) => {
        console.log(error);
      });
    axios.get(BACKEND_GET_ALLOWED_WORD_LIST, { params: { username: user.name } })
      .then((response) => {
        const allowedList = response.data.map(str => { return { word: str, remove: false } });
        setAllowedList(allowedList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            allowedList={allowedList} setAllowedList={setAllowedList} user={user} handleLogOut={handleLogOut} />} />

          <Route path="/Login" element={<Login setAns={setAnswerList} setAllowed={setAllowedList}
            setUser={setUser} />} />

          <Route path="/Register" element={<Register setAns={setAnswerList} setAllowed={setAllowedList}
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

