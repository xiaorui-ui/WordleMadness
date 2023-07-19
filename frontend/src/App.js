import "./styles.css";
import axios from 'axios';
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import Register from "./pages/Register.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo } from 'react';
import { BACKEND_LOGOUT, DEFAULT_WORDS } from "./components/Constants";


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

  const handleLogOut = async () => {
    // setCloseable(false);
    // setPromptMessage("Logging out...");
    // setShowPrompt(true);
    sessionStorage.removeItem("user");
    setUser({ name: "", isLoggedIn: false });
    await axios.patch(BACKEND_LOGOUT, null, {
      params: {
        name: user.name
      }
    })
      .then((response) => {
        // setShowPrompt(false);
        if (response.data === "Logged out") {
          alert("Logged out");
        } else {
          handleInvalidLogOut(response.data);
        }
        setAnswerList(DEFAULT_WORDS);
        setAllowedList(DEFAULT_WORDS);
        setBestTree(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogOutOnClose = async () => {
    if (document.visibilityState === 'hidden') {
      await axios.patch(BACKEND_LOGOUT, null, {
        params: {
          name: user.name
        }
      })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleInvalidLogOut = (data) => {
    // setCloseable(true);
    // setPromptMessage(data);
    // setShowPrompt(true);
    console.log(data);
  }

  const [bestTree, setBestTree] = useState(null);

  // when the window closes
  window.addEventListener('visibilitychange', handleLogOutOnClose);

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            answerLength={answerLength} allowedLength={allowedLength} allowedList={allowedList} setAllowedList={setAllowedList}
            user={user} setBestTree={setBestTree} handleLogOut={handleLogOut} />} />

          <Route path="/Login" element={<Login setUser={setUser} />} />

          <Route path="/Register" element={<Register setUser={setUser} />} />

          <Route path="/DecisionTree" element={<DecisionTree answerList={answerList} setAnswerList={setAnswerList}
            allowedList={allowedList} setAllowedList={setAllowedList} user={user}
            handleLogOut={handleLogOut} bestTree={bestTree} setBestTree={setBestTree} />} />

          <Route path="/UserGuide" element={<UserGuide user={user} handleLogOut={handleLogOut} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

