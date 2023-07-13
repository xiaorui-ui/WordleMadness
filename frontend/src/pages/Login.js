import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomPrompt from '../components/CustomPrompt.js';
import Username from '../components/Username.js';
import Password from '../components/Password.js';
import LoginLogic from '../components/LoginLogic.js';

// to do: only allow one user to log in at once

export default function Login({ setUser }) {

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

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        LoginLogic(setUser, username, passwordValues, setShowPrompt, setPromptMessage, "Login",
            navigate);
    }

    return (
        <>
            <div className="sidebar">
                <br />
                <a href="/">Continue without logging in</a>
                <br />
                <a href="/UserGuide">User guide</a>
            </div>

            {/* default font size = 16px */}
            <div className='login' >


                {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} />}

                <h1>Wordle Madness</h1>
                <form id="Login" onSubmit={handleSubmit}>

                    <Username username={username} setUsername={setUsername} />

                    <Password passwordValues={passwordValues} setPasswordValues={setPasswordValues} />

                    {/* Empty space between p/w and submit */}
                    <div style={{ height: "30px" }}></div>

                    <button style={{ fontSize: "18px" }}>Submit</button>

                    <div style={{ height: "30px" }}></div>

                    <a href="/Register" style={{ fontSize: "18px" }}>Register here</a>

                </form>
            </div >
        </>

    );
}