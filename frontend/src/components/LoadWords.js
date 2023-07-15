import { useEffect, useState } from "react";
import CustomPrompt from "./CustomPrompt.js";
import axios from 'axios';
import https from 'https';
import { BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, DEFAULT_WORDS } from "./Constants";

export default function LoadWords({ user, showPrompt, setShowPrompt, promptMessage, setPromptMessage, closeable, setCloseable, 
    setAnswerList, setAllowedList }) {
    
    const handleDismiss = () => {
        setShowPrompt(false);
    }
    
    const [wordListLoaded, setWordListLoaded] = useState(false);
    const [allowedListLoaded, setAllowedListLoaded] = useState(false);
    

    useEffect(() => {
        if (wordListLoaded && allowedListLoaded) {
            setShowPrompt(false);
        } else {
            setCloseable(false);
            setPromptMessage("Loading words");
            setShowPrompt(true);
        }
    }, [wordListLoaded, allowedListLoaded, setCloseable, setPromptMessage, setShowPrompt]);

    useEffect(() => {
        if (!user || user.name === "") {
            setAnswerList(DEFAULT_WORDS);
            setAllowedList(DEFAULT_WORDS);
            setShowPrompt(false);
          } else {
            axios.get(BACKEND_GET_WORD_LIST, { params: { username: user.name },
                httpsAgent: new https.Agent({
                    rejectUnauthorized: false
                  }) })
                   .then((response) => {
                      const ansList = response.data.map(str => { return { word: str, remove: false } });
                      setAnswerList(ansList);
                      setWordListLoaded(true);
                   })
                   .catch((error) => {
                      console.log(error);
                   });
          axios.get(BACKEND_GET_ALLOWED_WORD_LIST, { params: { username: user.name },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
              }) })
                  .then((response) => {
                      const allowedList = response.data.map(str => { return { word: str, remove: false } });
                      setAllowedList(allowedList);
                      setAllowedListLoaded(true);
                  })
                  .catch((error) => {
                      console.log(error);
                  });
          } 
    }, [user, setAnswerList, setAllowedList, setShowPrompt]);
    return (
        <>
            {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}
        </>
    );
}