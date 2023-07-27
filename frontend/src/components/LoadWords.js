import { useCallback, useEffect, useState } from "react";
import CustomPrompt from "./CustomPrompt.js";
import axios from 'axios';
import { BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST, BACKEND_GET_TREE, DEFAULT_WORDS } from "./Constants";

export default function LoadWords({ user, showPrompt, setShowPrompt, promptMessage, setPromptMessage, closeable, setCloseable,
    setAnswerList, setAllowedList, setBestTree }) {

    const handleDismiss = useCallback(() => {
        setShowPrompt(false);
    }, [setShowPrompt]);

    const [wordListLoaded, setWordListLoaded] = useState(false);
    const [allowedListLoaded, setAllowedListLoaded] = useState(false);
    const [bestTreeLoaded, setBestTreeLoaded] = useState(false);


    // Closes the loading words prompt if all the words are loaded, then resets the boolean values.
    useEffect(() => {
        if (wordListLoaded && allowedListLoaded && bestTreeLoaded) {
            setShowPrompt(false);
            setWordListLoaded(false);
            setAllowedListLoaded(false);
            setBestTreeLoaded(false);
        }
    }, [wordListLoaded, allowedListLoaded, bestTreeLoaded, setShowPrompt]);

    useEffect(() => {
        if (user.isLoggedIn) {
            // Loads user lists and tree
            setPromptMessage("Loading words...");
            setCloseable(false);
            setShowPrompt(true);
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
        } else {
            // Loads logged-out lists. Note: when logged out, decision trees are NOT saved.
            const wordLists = JSON.parse(sessionStorage.getItem("guest-lists"));
            if (wordLists !== null) {
                setAllowedList(wordLists.allowedList);
                setAllowedListLoaded(true);
                setAnswerList(wordLists.ansList);
                setWordListLoaded(true);
            } else {
                setAllowedList(DEFAULT_WORDS);
                setAllowedListLoaded(true);
                setAnswerList(DEFAULT_WORDS);
                setWordListLoaded(true);
            }
            setBestTreeLoaded(true);
        }
    }, [user, setAnswerList, setAllowedList, setBestTree, setShowPrompt, setCloseable, setPromptMessage]);
    return (
        <>
            {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}
        </>
    );
}