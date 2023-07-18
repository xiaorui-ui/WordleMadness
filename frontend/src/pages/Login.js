import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import CustomPrompt from '../components/CustomPrompt.js';
import Username from '../components/LoginRegister/Username.js';
import Password from '../components/LoginRegister/Password.js';
import LoginLogic from '../components/LoginRegister/LoginLogic.js';

// to do: only allow one user to log in at once

export default function Login({ setUser }) {

    const [username, setUsername] = useState("");
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        showPassword: false,
    });
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");
    const [closeable, setCloseable] = useState(true);

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        LoginLogic(setUser, username, passwordValues, setShowPrompt, setPromptMessage, setCloseable, "Login",
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


                {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />}

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