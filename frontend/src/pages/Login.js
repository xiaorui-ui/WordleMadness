import { useNavigate } from 'react-router-dom';
// possible to use the Link function from the same library as well
import { useState } from 'react';
import CustomPrompt from '../components/CustomPrompt.js';
import Username from '../components/Username.js';
import Password from '../components/Password.js';
import LoginLogic from '../components/LoginLogic.js';

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

            <div className='login'>


                {showPrompt && <CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />}

                <h1>Wordle Madness</h1>
                <form id="Login" onSubmit={handleSubmit}>

                    <Username username={username} setUsername={setUsername} />

                    <Password passwordValues={passwordValues} setPasswordValues={setPasswordValues} />

                    {/* Empty space between p/w and submit */}
                    <div style={{ height: "30px" }}></div>

                    <button>Submit</button>

                    <div style={{ height: "30px" }}></div>

                    <a href="/Register">Register here</a>

                </form>
            </div>
        </>

    );
}