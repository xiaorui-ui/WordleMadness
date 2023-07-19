import { useEffect, useState } from "react";
import CustomPrompt from "./CustomPrompt.js";
import axios from 'axios';
import { BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, DEFAULT_WORDS } from "./Constants";

export default function LoadWords({ user, showPrompt, setShowPrompt, promptMessage, setPromptMessage, closeable, setCloseable, 
    setAnswerList, setAllowedList, loadingPrompt, setLoadingPrompt }) {
    
    const handleDismiss = () => {
        setShowPrompt(false);
    }
    
    const [wordListLoaded, setWordListLoaded] = useState(false);
    const [allowedListLoaded, setAllowedListLoaded] = useState(false);  

    useEffect(() => {
        if (wordListLoaded && allowedListLoaded) {
            setShowPrompt(false);
        }
    }, [wordListLoaded, allowedListLoaded, setShowPrompt]);

    useEffect(() => {
        if (user.isLoggedIn && loadingPrompt) {
            setLoadingPrompt(false);
        }
        setPromptMessage("Loading words...");
        setCloseable(false);
        setShowPrompt(true);
        if (!user.isLoggedIn) {
            setAnswerList(DEFAULT_WORDS);
            setAllowedList(DEFAULT_WORDS);
            setShowPrompt(false);
          } else {
            axios.get(BACKEND_GET_WORD_LIST, { params: { username: user.name } })
                   .then((response) => {
                      const ansList = response.data.map(str => { return { word: str, remove: false } });
                      setAnswerList(ansList);
                      setWordListLoaded(true);
                   })
                   .catch((error) => {
                    setCloseable(true);
                    setPromptMessage("Error syncing to backend! Please try again later.");
                    setShowPrompt(true);
                   });
          axios.get(BACKEND_GET_ALLOWED_WORD_LIST, { params: { username: user.name } })
                  .then((response) => {
                      const allowedList = response.data.map(str => { return { word: str, remove: false } });
                      setAllowedList(allowedList);
                      setAllowedListLoaded(true);
                  })
                  .catch((error) => {
                    setCloseable(true);
                    setPromptMessage("Error syncing to backend! Please try again later.");
                    setShowPrompt(true);
                  });
          } 
    }, [user, setAnswerList, setAllowedList, setShowPrompt, setCloseable, setPromptMessage, loadingPrompt, setLoadingPrompt]);
    return (
        <>
            {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}
        </>
    );
}