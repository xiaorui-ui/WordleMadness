import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomPrompt from '../components/CustomPrompt.js';
import Username from '../components/LoginRegister/Username.js';
import Password from '../components/LoginRegister/Password.js';
import LoginLogic from '../components/LoginRegister/LoginLogic.js';


export default function Login({ user, setUser, showPrompt, setShowPrompt, promptMessage,
    setPromptMessage, closeable, setCloseable, setUnverifiedUser }) {

    const [username, setUsername] = useState("");
    const [passwordValues, setPasswordValues] = useState({
        password: "",
        showPassword: false,
    });

    const handleDismiss = useCallback(() => {
        setShowPrompt(false);
    }, [setShowPrompt]);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        LoginLogic([], [], setUser, username, passwordValues, setShowPrompt, setPromptMessage,
            setCloseable, "Login", navigate, setUnverifiedUser, "", -1);
    }

    useEffect(() => {
        if (user.isLoggedIn) {
            let destination = '/';
            navigate(destination);
        }
    }, [user, navigate]);

    return (
        <>
            {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />}

            <div className="sidebar">
                <br />
                <a href="/">Continue without logging in</a>
                <br />
                <a href="/UserGuide">User guide</a>
            </div>

            {/* default font size = 16px */}
            <div className='login' >

                <h1>Wordle Madness</h1>
                <form id="Login" onSubmit={handleSubmit}>

                    <Username username={username} setUsername={setUsername} />

                    <Password passwordValues={passwordValues} setPasswordValues={setPasswordValues} />

                    {/* Empty space between p/w and submit */}
                    <div style={{ height: "30px" }}></div>

                    <button style={{ fontSize: "18px" }}>Submit</button>

                    <div style={{ height: "30px" }}></div>

                    <Link to="/Register" style={{ fontSize: "18px" }}>Register here</Link>

                </form>
            </div >
        </>

    );
}