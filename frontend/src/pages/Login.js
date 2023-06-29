import { useNavigate } from 'react-router-dom';
// possible to use the Link function from the same library as well
import { useState } from 'react';
import axios from 'axios';
import CustomPrompt from '../components/CustomPrompt.js';
import { BACKEND_LOGIN, BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST } from '../components/Constants.js';

// To-do: registration of new account

// To-do: Refactor! It's getting pretty long. 

export default function Login({ setAns, setAllowed, setUser }) {

    // implement showSidebar later

    const [username, setUsername] = useState("");
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        showPassword: false,
    });
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");



    const handleClickShowPassword = () => {
        setPasswordValues({ ...passwordValues, showPassword: !passwordValues.showPassword });
    };

    const retrieveWordList = () => {
        axios.get(BACKEND_GET_WORD_LIST, { params: { username: username } })
            .then((response) => {
                const ansList = response.data.map(str => { return { word: str, remove: false } })
                setAns(ansList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const retrieveAllowedWordList = () => {
        axios.get(BACKEND_GET_ALLOWED_WORD_LIST, { params: { username: username } })
            .then((response) => {
                const allowedList = response.data.map(str => { return { word: str, remove: false } })
                setAllowed(allowedList);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const navigate = useNavigate();

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    const handleInvalidLogin = () => {
        setShowPrompt(true);
        setPromptMessage("Wrong login details! Please try again.");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Determine the destination based on username and password
        let destination = '';

        console.log(username.length);
        console.log(passwordValues.password.length);

        if ((0 < username.length && username.length <= 10 &&
            3 <= passwordValues.password.length && passwordValues.password.length <= 10)) {
            setShowPrompt(true);
            setPromptMessage("Logging in...");
            axios.post(BACKEND_LOGIN, {}, { params: { name: username, password: passwordValues.password } })
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
        } else if (passwordValues.password.length < 6) {
            setShowPrompt(true);
            setPromptMessage("Please set a password with at least 3 characters");
            // return;
        } else {
            // else statement may not be required if the previous statements return
            setShowPrompt(true);
            setPromptMessage("Please set a username and password with at most 10 characters each");
        }

    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordValues({ ...passwordValues, password: event.target.value });
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
                    <label>Username:</label>
                    <input type='text' value={username} onChange={handleUsernameChange}
                        placeholder="e.g: Josh_Wordle" />
                    {/*Line break */}
                    <br />

                    <label>Password:</label>
                    <input type={passwordValues.showPassword ? "text" : "password"}
                        value={passwordValues.password} onChange={handlePasswordChange}
                        placeholder="e.g: 79salet20">
                    </input>

                    <button type="button" onClick={handleClickShowPassword}
                        style={{ fontSize: "10px", marginLeft: "10px", backgroundColor: "black" }}>
                        {passwordValues.showPassword ? "  Hide  " : "        Show  "}
                    </button>

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