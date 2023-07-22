import "./styles.css";
import axios from 'axios';
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import Register from "./pages/Register.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCallback, useEffect, useState, useMemo } from 'react';
import { BACKEND_CACHED_LOGIN, BACKEND_LOGOUT, DEFAULT_WORDS } from "./components/Constants";
import CustomPrompt from "./components/CustomPrompt";
import WarningPrompt from "./components/WarningPrompt";


export default function App() {

  // answer before allowed, ALWAYS!!!

  const [answerList, setAnswerList] = useState(DEFAULT_WORDS);

  const [allowedList, setAllowedList] = useState(DEFAULT_WORDS);

  const [showPrompt, setShowPrompt] = useState(false);

  const [promptMessage, setPromptMessage] = useState('');

  const [closeable, setCloseable] = useState(true);

  const [showWarningPrompt, setShowWarningPrompt] = useState(false);

  const [warningPromptMessage, setWarningPromptMessage] = useState('');

  const [bestTree, setBestTree] = useState("");

  const [user, setUser] = useState({ isLoggedIn: false, name: "" });

  const abruptLogOutParams = useMemo(() => {
    return new URLSearchParams({name: user.name})
  }, [user]);

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

  const handleNoLogin = useCallback(() => {
    sessionStorage.removeItem("wordle-user");
    setShowWarningPrompt(false);
  }, [setShowWarningPrompt]);

  const handleCachedLogIn = useCallback(() => {
    setShowWarningPrompt(false);
    const cache = sessionStorage.getItem("wordle-user");
    setPromptMessage("Loading saved user details...")
    setCloseable(false);
    setShowPrompt(true);
    axios.patch(BACKEND_CACHED_LOGIN, {}, {
      params: {
        name: cache
      }
    })
      .then((response) => {
        if (response.data === "Logged in") {
          setUser({ isLoggedIn: true, name: cache });
        } else {
          sessionStorage.removeItem("wordle-user");
          setCloseable(true);
          setPromptMessage(response.data);
          setShowPrompt(true);
        }
      })
      .catch((error) => {
        sessionStorage.removeItem("wordle-user");
        setCloseable(true);
        setPromptMessage("Error communicating with backend! Please try again later");
        setShowPrompt(true);
      });
}, [setPromptMessage, setCloseable, setShowPrompt]);

  const handleInvalidLogOut = useCallback((data) => {
      setCloseable(true);
      setPromptMessage(data);
      setShowPrompt(true);
    }, [setCloseable, setPromptMessage, setShowPrompt]);

  const handleLogOut = useCallback(() => {
    if (user.isLoggedIn) {
      setCloseable(false);
      setPromptMessage("Logging out...");
      setShowPrompt(true);
      sessionStorage.removeItem("wordle-user");
      setUser({ name: "", isLoggedIn: false });
      axios.patch(BACKEND_LOGOUT, {}, {
        params: {
          name: user.name
        }
      })
        .then((response) => {
          if (response.data === "Logged out") {
            // alert("Logged out");
          } else {
            handleInvalidLogOut(response.data);
          }
          setAnswerList(DEFAULT_WORDS);
          setAllowedList(DEFAULT_WORDS);
          setBestTree("");
          setShowPrompt(false);
        })
        .catch((error) => {
          setCloseable(true);
          setPromptMessage("Error communicating with backend! Please try again later");
          setShowPrompt(true);
        });
    }
  }, [user, handleInvalidLogOut]);

  // Initial login if user has been saved in cache
  useEffect(() => {
    const cache = sessionStorage.getItem("wordle-user");
    if (cache !== null && cache !== "") {
      setWarningPromptMessage(`You have a previouly saved login as ${cache}. Do you wish to continue or log out?`);
      setShowWarningPrompt(true);
    }
  }, []);

  // Logging out the user upon closing the tab

  useEffect(() => {
    const handleLogOutOnClose = (event) => {
      event.preventDefault();
      if (user.isLoggedIn) {
        fetch(BACKEND_LOGOUT, {
          method: "PATCH", 
          body: abruptLogOutParams,
          keepalive: true
      })
      }
    };

    window.addEventListener('beforeunload', handleLogOutOnClose);

    return () => {
      window.removeEventListener('beforeunload', handleLogOutOnClose);
    };
  }, [user, abruptLogOutParams]);

  return (
    <div className="App">

      {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}

      {showWarningPrompt && (<WarningPrompt message={warningPromptMessage} onDismiss={handleNoLogin} onSave={handleCachedLogIn}/>)}

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            answerLength={answerLength} allowedLength={allowedLength} allowedList={allowedList} setAllowedList={setAllowedList}
            user={user} setBestTree={setBestTree} handleLogOut={handleLogOut} loadingPrompt={showPrompt}
            setLoadingPrompt={setShowPrompt} />} />

          <Route path="/Login" element={<Login user={user} setUser={setUser} />} />

          <Route path="/Register" element={<Register user={user} setUser={setUser} />} />

          <Route path="/DecisionTree" element={<DecisionTree answerList={answerList} setAnswerList={setAnswerList}
            allowedList={allowedList} setAllowedList={setAllowedList} user={user}
            handleLogOut={handleLogOut} bestTree={bestTree} setBestTree={setBestTree} loadingPrompt={showPrompt}
            setLoadingPrompt={setShowPrompt} />} />

          <Route path="/UserGuide" element={<UserGuide user={user} handleLogOut={handleLogOut} loadingPrompt={showPrompt}
            setLoadingPrompt={setShowPrompt} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

