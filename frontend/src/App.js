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


export default function App() {

  // answer before allowed, ALWAYS!!!

  const [answerList, setAnswerList] = useState(DEFAULT_WORDS);

  const [allowedList, setAllowedList] = useState(DEFAULT_WORDS);

  const [showPrompt, setShowPrompt] = useState(false);

  const [promptMessage, setPromptMessage] = useState('');

  const [closeable, setCloseable] = useState(true);

  const [bestTree, setBestTree] = useState("");

  const [user, setUser] = useState({ isLoggedIn: false, name: "" });

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

  const handleLogOut = useCallback(() => {
    if (user.isLoggedIn) {
      setCloseable(false);
      setPromptMessage("Logging out...");
      setShowPrompt(true);
      sessionStorage.removeItem("user");
      setUser({ name: "", isLoggedIn: false });
      axios.patch(BACKEND_LOGOUT, {}, {
        params: {
          name: user.name
        }
      })
        .then((response) => {
          if (response.data === "Logged out") {
            //alert("Logged out");
          } else {
            handleInvalidLogOut(response.data);
          }
          setAnswerList(DEFAULT_WORDS);
          setAllowedList(DEFAULT_WORDS);
          setBestTree("");
          console.log(bestTree);
          setShowPrompt(false);
        })
        .catch((error) => {
          setCloseable(true);
          setPromptMessage("Error communicating with backend! Please try again later");
          setShowPrompt(true);
        });
    }
  }, [user]);

  const handleAbruptLogOut = useCallback(() => {
    if (user.isLoggedIn) {
      axios.patch(BACKEND_LOGOUT, {}, {
        params: {
          name: user.name
        }
      })
    }
  }, [user]);

  const handleInvalidLogOut = (data) => {
    setCloseable(true);
    setPromptMessage(data);
    setShowPrompt(true);
  }

  // Initial login if user has been saved in cache
  useEffect(() => {
    const cache = sessionStorage.getItem("user");
    if (cache !== null && cache !== "") {
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
            setCloseable(true);
            setPromptMessage(response.data);
            setShowPrompt(true);
          }
        })
        .catch((error) => {
          setCloseable(true);
          setPromptMessage("Error communicating with backend! Please try again later");
          setShowPrompt(true);
        });
    }
  }, []);


  // Logging out the user upon closing the tab

  const dummy = () => { return 2; };

  useEffect(() => {
    const handleLogOutOnClose = (event) => {
      event.preventDefault();
      handleAbruptLogOut();
      dummy();
      // the prompt doesn't show, but interestingly this works
      setPromptMessage("Logged out");
      setShowPrompt(true);
      setCloseable(true);
    };

    window.addEventListener('beforeunload', handleLogOutOnClose);

    return () => {
      window.removeEventListener('beforeunload', handleLogOutOnClose);
    };
  }, [handleAbruptLogOut]);



  // useEffect(() => {
  //   const handleLogOutOnClose = (event) => {
  //     event.preventDefault();
  //     if (document.visibilityState === 'hidden' && document.hidden) {
  //       handleAbruptLogOut();
  //     }
  //   };

  //   document.addEventListener('visibilitychange', handleLogOutOnClose);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleLogOutOnClose);
  //   };
  // }, [handleAbruptLogOut]);


  // useEffect(() => {
  //   // Flag to track whether the tab has focus
  //   let tabHasFocus = true;

  //   const handleLogOutOnClose = (event) => {
  //     event.preventDefault();
  //     if (!tabHasFocus) {
  //       // The tab is being closed or hidden
  //       handleLogOut();
  //     }
  //   };

  //   const handleTabFocus = () => {
  //     tabHasFocus = true;
  //   };

  //   const handleTabBlur = () => {
  //     tabHasFocus = false;
  //   };

  //   window.addEventListener('beforeunload', handleLogOutOnClose);
  //   window.addEventListener('focus', handleTabFocus);
  //   window.addEventListener('blur', handleTabBlur);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleLogOutOnClose);
  //     window.removeEventListener('focus', handleTabFocus);
  //     window.removeEventListener('blur', handleTabBlur);
  //   };
  // }, [handleLogOut]);

  return (
    <div className="App">

      {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}

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

