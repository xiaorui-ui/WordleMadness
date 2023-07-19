import { useNavigate } from 'react-router-dom';
import Username from '../components/LoginRegister/Username.js';
import Password from '../components/LoginRegister/Password.js';
import { useCallback, useEffect, useState } from 'react';
import CustomPrompt from '../components/CustomPrompt.js';
import LoginLogic from '../components/LoginRegister/LoginLogic.js';

export default function Register({ user, setUser }) {

    const [username, setUsername] = useState("");
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        showPassword: false,
    });
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");
    const [closeable, setCloseable] = useState(true);

    const handleDismiss = useCallback(() => {
        setShowPrompt(false);
    }, [setShowPrompt]);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.isLoggedIn) {
            let destination = '/';
            navigate(destination);
        }
    }, [user, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();
        LoginLogic(setUser, username, passwordValues, setShowPrompt, setPromptMessage, setCloseable, "Register",
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

            <div className='login'>


                {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />}

                <h1>Wordle Madness</h1>
                <form id="Login" onSubmit={handleSubmit}>

                    <Username username={username} setUsername={setUsername} />

                    <Password passwordValues={passwordValues} setPasswordValues={setPasswordValues} />

                    {/* Empty space between p/w and submit */}
                    <div style={{ height: "30px" }}></div>

                    <button>Submit</button>

                </form>

            </div>
        </>
    );
}