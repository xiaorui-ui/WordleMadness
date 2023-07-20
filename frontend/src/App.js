import "./styles.css";
import axios from 'axios';
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import Register from "./pages/Register.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCallback, useEffect, useState, useMemo } from 'react';
import { BACKEND_LOGOUT, DEFAULT_WORDS } from "./components/Constants";
import CustomPrompt from "./components/CustomPrompt";


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

  const [showPrompt, setShowPrompt] = useState(false);

  const [promptMessage, setPromptMessage] = useState('');

  const [closeable, setCloseable] = useState(true);

  const [bestTree, setBestTree] = useState(null);

  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
  }, []);

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

  const handleLogOut = useCallback(() => {
    setCloseable(false);
    setPromptMessage("Logging out...");
    setShowPrompt(true);
    sessionStorage.removeItem("user");
    setUser({ name: "", isLoggedIn: false });
    axios.patch(BACKEND_LOGOUT, null, {
      params: {
        name: user.name
      }
    })
      .then((response) => {
        setShowPrompt(false);
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
        setCloseable(true);
        setPromptMessage("Error communicating with backend! Please try again later");
        setShowPrompt(true);
      });
  }, [user]);

  useEffect(() => {
    const handleLogOutOnClose = (event) => {
      event.preventDefault();
      handleLogOut();
      return;
    };

    window.addEventListener('beforeunload', handleLogOutOnClose);

    return () => {
      window.removeEventListener('beforeunload', handleLogOutOnClose);
    };
  }, [handleLogOut]);

  const handleInvalidLogOut = (data) => {
    setCloseable(true);
    setPromptMessage(data);
    setShowPrompt(true);
  }

  return (
    <div className="App">

      {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}

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

