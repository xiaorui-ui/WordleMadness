import { useNavigate } from 'react-router-dom';
// possible to use the Link function from the same library as well
import { useState } from 'react';
import axios from 'axios';
import CustomPrompt from '../components/CustomPrompt.js';
import Username from '../components/Username.js';
import Password from '../components/Password.js';
import LoginLogic from '../components/LoginLogic.js';
import { BACKEND_LOGIN, BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST } from '../components/Constants.js';

// To-do: registration of new account

export default function Login({ setAns, setAllowed, setUser }) {

    // implement showSidebar later

    const [username, setUsername] = useState("");
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        showPassword: false,
    });
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    const retrieveWordList = () => {
        axios.get(BACKEND_GET_WORD_LIST, { params: { username: username } })
            .then((response) => {
                const ansList = response.data.
                    map(str => { return { word: str, remove: false } });
                setAns(ansList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const retrieveAllowedWordList = () => {
        axios.get(BACKEND_GET_ALLOWED_WORD_LIST, { params: { username: username } })
            .then((response) => {
                const allowedList = response.data.map
                    (str => { return { word: str, remove: false } });
                setAllowed(allowedList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const navigate = useNavigate();

    const handleInvalidLogin = () => {
        setShowPrompt(true);
        setPromptMessage("Wrong login details! Please try again.");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // LoginLogic(setAns, setAllowed, setUser, username, passwordValues,
        //     setShowPrompt, setPromptMessage, "Login");
        LoginLogic(setUser, username, passwordValues, setShowPrompt, setPromptMessage, "Login",
            retrieveWordList, retrieveAllowedWordList, navigate, handleInvalidLogin);
    }

    return (
        <>
            <div className="sidebar">
                <br />
                <a href="/">Continue without logging in</a>
                <br />
                <a href="/UserGuide">User guide</a>
            </div>

            <div className='login'>


                {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} />}

                <h1>Wordle Madness</h1>
                <form id="Login" onSubmit={handleSubmit}>

                    <Username username={username} setUsername={setUsername} />

                    <Password passwordValues={passwordValues} setPasswordValues={setPasswordValues} />

                    {/* Empty space between p/w and submit */}
                    <div style={{ height: "30px" }}></div>

                    <button>Submit</button>

                    <div style={{ height: "30px" }}></div>

                    <a href="/Register">First time?</a>

                </form>
            </div>
        </>

    );
}