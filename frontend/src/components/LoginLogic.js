import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_LOGIN, BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST } from '../components/Constants.js';

// export default function LoginLogic(setAns, setAllowed, setUser,
//     username, passwordValues, setShowPrompt, setPromptMessage, type) {
export default function LoginLogic(setUser, username, passwordValues, setShowPrompt, setPromptMessage, type,
    retrieveWordList, retrieveAllowedWordList, navigate, handleInvalidLogin) {

    // const retrieveWordList = () => {
    //     axios.get(BACKEND_GET_WORD_LIST, { params: { username: username } })
    //         .then((response) => {
    //             const ansList = response.data.
    //                 map(str => { return { word: str, remove: false } });
    //             setAns(ansList);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // const retrieveAllowedWordList = () => {
    //     axios.get(BACKEND_GET_ALLOWED_WORD_LIST, { params: { username: username } })
    //         .then((response) => {
    //             const allowedList = response.data.map
    //                 (str => { return { word: str, remove: false } });
    //             setAllowed(allowedList);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    // const navigate = useNavigate();

    // const handleInvalidLogin = () => {
    //     setShowPrompt(true);
    //     setPromptMessage("Wrong login details! Please try again.");
    // }

    let destination = '';

    if ((0 < username.length && username.length <= 10 &&
        3 <= passwordValues.password.length && passwordValues.password.length <= 10)) {
        setShowPrompt(true);
        setPromptMessage("Logging in...");
        axios.post(BACKEND_LOGIN, {}, {
            params: {
                name: username,
                password: passwordValues.password
            }
        })
            .then((response) => {
                if (response.data === "Logged in") {
                    setUser({ name: username, isLoggedIn: true });
                    retrieveWordList();
                    retrieveAllowedWordList();
                    destination = '/';
                    navigate(destination);
                } else {
                    handleInvalidLogin();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // return;
    } else if (username.length === 0) {
        setShowPrompt(true);
        setPromptMessage("Please set a username");
        // return;
    } else if (passwordValues.password.length < 3) {
        setShowPrompt(true);
        setPromptMessage("Please enter a password with at least 3 characters");
        // return;
    } else {
        setShowPrompt(true);
        setPromptMessage("Please enter a username and password with at most 10 characters each");
    }
}