import { useEffect, useState } from "react";
import CustomPrompt from "./CustomPrompt.js";
import axios from 'axios';
import { BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, BACKEND_GET_TREE, DEFAULT_WORDS } from "./Constants";

export default function LoadWords({ user, showPrompt, setShowPrompt, promptMessage, setPromptMessage, closeable, setCloseable,
    setAnswerList, setAllowedList, setBestTree, loadingPrompt, setLoadingPrompt }) {

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    const [wordListLoaded, setWordListLoaded] = useState(false);
    const [allowedListLoaded, setAllowedListLoaded] = useState(false);
    const [bestTreeLoaded, setBestTreeLoaded] = useState(false);


    useEffect(() => {
        if ((wordListLoaded && allowedListLoaded) && bestTreeLoaded) {
            setShowPrompt(false);
        }
    }, [wordListLoaded, allowedListLoaded, bestTreeLoaded, setShowPrompt]);

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
            setBestTree(null);
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
            axios.get(BACKEND_GET_TREE, { params: { username: user.name } })
                .then((response) => {
                    setBestTree(response.data);
                    setBestTreeLoaded(true);
                })
                .catch((error) => {
                    setCloseable(true);
                    setPromptMessage("Error syncing to backend! Please try again later.");
                    setShowPrompt(true);
                });
        }
    }, [user, setAnswerList, setAllowedList, setShowPrompt, setCloseable, setPromptMessage, loadingPrompt,
    setBestTree, setLoadingPrompt]);
    return (
        <>
            {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}
        </>
    );
}