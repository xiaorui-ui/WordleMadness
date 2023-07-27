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
import LoadWords from "./components/LoadWords";


export default function App() {

  // Lists and Decision Tree displayed in frontend
  const [answerList, setAnswerList] = useState(DEFAULT_WORDS);

  const [allowedList, setAllowedList] = useState(DEFAULT_WORDS);

  const [bestTree, setBestTree] = useState("");

  // Prompt variables for app prompt
  const [showPrompt, setShowPrompt] = useState(false);

  const [promptMessage, setPromptMessage] = useState('');

  const [closeable, setCloseable] = useState(true);

  // Prompt variables for individual page prompts
  const [showPagePrompt, setShowPagePrompt] = useState(false);

  const [pagePromptMessage, setPagePromptMessage] = useState('');

  const [pagePromptCloseable, setPagePromptCloseable] = useState(true);

  // Prompt variables for app warning prompt
  const [showWarningPrompt, setShowWarningPrompt] = useState(false);

  const [warningPromptMessage, setWarningPromptMessage] = useState('');

  // User parameters. unverifiedUser is used when login or logout is still pending.
  const [user, setUser] = useState({ isLoggedIn: false, name: "" });
  const [unverifiedUser, setUnverifiedUser] = useState({ isLoggedIn: false, name: "" });

  // Parameters for HTTP request in the case of an abrupt logout
  const abruptLogOutParams = useMemo(() => {
    const username = user.isLoggedIn ? user.name : unverifiedUser.name;
    return new URLSearchParams(
      { 
        name: username
      });
  }, [user, unverifiedUser]);

  // Handler for dismissing of app prompt
  const handleDismiss = useCallback(() => {
    setShowPrompt(false);
  }, []);

  // Dynamic calculation of the answerLength and allowedLength of words, based on the current lists
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

  // Handling of user dismissal of cached login
  const handleNoLogin = useCallback(() => {
    sessionStorage.removeItem("wordle-user");
    setShowWarningPrompt(false);
  }, [setShowWarningPrompt]);

  // Handling of user acceptance of cached login
  const handleCachedLogIn = useCallback(() => {
    setShowWarningPrompt(false);
    const cache = sessionStorage.getItem("wordle-user");
    setUnverifiedUser({ isLoggedIn: true, name: cache });
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
        setUnverifiedUser({ isLoggedIn: false, name: "" });
      })
      .catch((error) => {
        sessionStorage.removeItem("wordle-user");
        setCloseable(true);
        setPromptMessage("Error communicating with backend! Please try again later");
        setShowPrompt(true);
        setUnverifiedUser({ isLoggedIn: false, name: "" });
      });
}, [setPromptMessage, setCloseable, setShowPrompt, setUnverifiedUser]);

  // Handling of invalid logout
  const handleInvalidLogOut = useCallback((data) => {
      setCloseable(true);
      setPromptMessage(data);
      setShowPrompt(true);
    }, [setCloseable, setPromptMessage, setShowPrompt]);

  // Handling of normal logout
  const handleLogOut = useCallback(() => {
    if (user.isLoggedIn || unverifiedUser.isLoggedIn) {
      const username = user.isLoggedIn ? user.name : unverifiedUser.name;
      setCloseable(false);
      setPromptMessage("Logging out...");
      setShowPrompt(true);
      setUser({ name: "", isLoggedIn: false });
      sessionStorage.removeItem("wordle-user");
      setAnswerList(DEFAULT_WORDS);
      setAllowedList(DEFAULT_WORDS);
      setBestTree("");
      axios.patch(BACKEND_LOGOUT, {}, {
        params: {
          name: username
        }
      })
        .then((response) => {          
          setShowPrompt(false);
          if (response.data === "Logged out") {
            return;
          } else {
            handleInvalidLogOut(response.data);
          }
        })
        .catch((error) => {
          setCloseable(true);
          setPromptMessage("Error communicating with backend! Please try again later");
          setShowPrompt(true);
        });
    }
  }, [user, unverifiedUser, handleInvalidLogOut]);

  // Initial login if user has been saved in cache
  useEffect(() => {
    const cache = sessionStorage.getItem("wordle-user");
    if (cache !== null && cache !== "") {
      setWarningPromptMessage(`You have a previouly saved login as ${cache}. Do you wish to continue or log out?`);
      setShowWarningPrompt(true);
    }
  }, []);

  // If user is not logged in, saving the lists in sessionStorage instead
  useEffect(() => {
    if (!user.isLoggedIn) {
      sessionStorage.setItem("guest-lists", JSON.stringify({ ansList: answerList, allowedList: allowedList }));
    }
  }, [user, allowedList, answerList]);

  // Logging out the user upon closing the tab or refreshing (abrupt logout)
  useEffect(() => {
    const handleLogOutOnClose = (event) => {
      event.preventDefault();
      if (user.isLoggedIn || unverifiedUser.isLoggedIn) {
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
  }, [user, unverifiedUser, abruptLogOutParams]);

  return (
    <div className="App">

      <LoadWords user={user} showPrompt={showPrompt} setShowPrompt={setShowPrompt} promptMessage={promptMessage}
        setPromptMessage={setPromptMessage} closeable={closeable} setCloseable={setCloseable}
        setAnswerList={setAnswerList} setAllowedList={setAllowedList} setBestTree={setBestTree} />

      {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}

      {showWarningPrompt && (<WarningPrompt message={warningPromptMessage} onDismiss={handleNoLogin} onSave={handleCachedLogIn}/>)}

      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Welcome answerList={answerList} setAnswerList={setAnswerList}
            answerLength={answerLength} allowedLength={allowedLength} allowedList={allowedList} setAllowedList={setAllowedList}
            user={user} setBestTree={setBestTree} handleLogOut={handleLogOut} showPrompt={showPagePrompt} setShowPrompt={setShowPagePrompt} 
            promptMessage={pagePromptMessage} setPromptMessage={setPagePromptMessage} closeable={pagePromptCloseable} 
            setCloseable={setPagePromptCloseable} />} />

          <Route path="/Login" element={<Login user={user} setUser={setUser} showPrompt={showPagePrompt} 
            setShowPrompt={setShowPagePrompt} promptMessage={pagePromptMessage} setPromptMessage={setPagePromptMessage} 
            closeable={pagePromptCloseable} setCloseable={setPagePromptCloseable} setUnverifiedUser={setUnverifiedUser} />} />

          <Route path="/Register" element={<Register initialAnswerList={answerList} initialAllowedList={allowedList} 
            user={user} setUser={setUser} showPrompt={showPagePrompt} setShowPrompt={setShowPagePrompt} 
            promptMessage={pagePromptMessage} setPromptMessage={setPagePromptMessage} closeable={pagePromptCloseable} 
            setCloseable={setPagePromptCloseable} setUnverifiedUser={setUnverifiedUser} />} />

          <Route path="/DecisionTree" element={<DecisionTree user={user} handleLogOut={handleLogOut} bestTree={bestTree} />} />

          <Route path="/UserGuide" element={<UserGuide user={user} handleLogOut={handleLogOut} />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

