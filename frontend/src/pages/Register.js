import { useNavigate } from 'react-router-dom';
import Username from '../components/Username.js';
import Password from '../components/Password.js';
import { useState } from 'react';
import CustomPrompt from '../components/CustomPrompt.js';
import LoginLogic from '../components/LoginLogic.js';

export default function Register({ setAns, setAllowed, setUser }) {

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

    const handleSubmit = (event) => {
    }

    return (
        <div className='login'>
            <form id="Login" onSubmit={handleSubmit}>

                <Username username={username} setUsername={setUsername} />

                <Password passwordValues={passwordValues} setPasswordValues={setPasswordValues} />

                {/* Empty space between p/w and submit */}
                <div style={{ height: "30px" }}></div>

                <button>Submit</button>

            </form>

        </div>
    )
}