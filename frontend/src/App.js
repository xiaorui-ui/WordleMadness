import "./styles.css";
import axios from 'axios';
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import Register from "./pages/Register.js"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect, useMemo } from 'react';
import { BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, DEFAULT_WORDS } from "./components/Constants";


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

  useEffect(() => {
    if (!user || user.name === "") {
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

  const [bestTree, setBestTree] = useState(undefined);

  // when the window closes
  window.addEventListener('unload', function (event) {
    // Perform logout action or update user status here
    // For example, make an API request to log out the user
    // or update their status to "logged out" in your server-side storage

    // Customize the confirmation message displayed to the user
    event.returnValue = 'Are you sure you want to leave this page?';
  });

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            answerLength={answerLength} allowedLength={allowedLength} allowedList={allowedList} setAllowedList={setAllowedList}
            user={user} handleLogOut={handleLogOut} />} />

          <Route path="/Login" element={<Login setUser={setUser} />} />

          <Route path="/Register" element={<Register setUser={setUser} />} />

          <Route path="/DecisionTree" element={<DecisionTree answerList={answerList} allowedList={allowedList} user={user}
            handleLogOut={handleLogOut} bestTree={bestTree} setBestTree={setBestTree} />} />

          <Route path="/UserGuide" element={<UserGuide user={user} handleLogOut={handleLogOut} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

