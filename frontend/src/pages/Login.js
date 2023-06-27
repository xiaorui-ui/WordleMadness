import { useNavigate } from 'react-router-dom';
// possible to use the Link function from the same library as well
import { useState } from 'react';
import axios from 'axios';
import CustomPrompt from '../components/CustomPrompt.js';
import { BACKEND_LOGIN, BACKEND_GET_WORD_LIST, BACKEND_GET_ALLOWED_WORD_LIST } from '../components/Constants.js';

// to-do: redirect user to create an account as well?

export default function Login({ setAns, setAllowed, setUser }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");

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

        if (username.length <= 10 && password.length <= 10) {
            axios.post(BACKEND_LOGIN, {}, { params: { name: username, password: password } })
                .then((response) => {
                    if (response.data === "Logged in") {
                        setShowPrompt(true);
                        setPromptMessage("Logging in...");
                        setUser({ name: username, loggedIn: true });
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
        } else {
            setShowPrompt(true);
            setPromptMessage("Please enter a username and password with 10 or fewer characters");
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className='login'>
            {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} />}

            <h1>Wordle Madness</h1>
            <form id="Login" onSubmit={handleSubmit}>
                <label>Username:</label><input type='text' value={username} onChange={handleUsernameChange}
                    placeholder="e.g: Josh_Wordle" />
                {/*Line break */}
                <br />

                <label>Password:</label><input type='text' value={password} onChange={handlePasswordChange}
                    placeholder="e.g: 79salet20" />
                <br />
                <div className='space-below'></div>

                {/* Empty space between p/w and submit */}
                <div style={{ height: "30px" }}></div>

                <button type="submit">Submit</button>
            </form>
        </div>



    );
}