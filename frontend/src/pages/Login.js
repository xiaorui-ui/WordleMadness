import { useNavigate } from 'react-router-dom';
// possible to use the Link function from the same library as well
import { useState } from 'react';
import CustomPrompt from '../components/CustomPrompt.js';

// to-do: redirect user to create an account as well?

export default function Login({ setWordList }) {

    const BACKEND_LOGIN = "http://localhost:8080/backend/verify";

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPrompt, setShowPrompt] = useState(false);
    const [promptMessage, setPromptMessage] = useState("");

    const navigate = useNavigate();

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Determine the destination based on username and password
        let destination = '';

        // change the logic to whatever appropriate

        // change the if block; the condition was simply a placeholder 
        if (username.length < 3 && password.length < 3) {
            axios.post(BACKEND_LOGIN, {}, { params: { name: username, password: password } })
                .then((response) => {
                    console.log(response.data);
                    // Handle data
                })
                .catch((error) => {
                    console.log(error);
                });
            // find wordList here from the backend(if present), placeholder is what you find from backend
            var retrieve = (1 > 2);
            var placeholder = [];
            if (retrieve) {
                setWordList(placeholder);
            }
            destination = '/';
        } else {
            setShowPrompt(true);
            setPromptMessage("Password bad");
        }

        // Redirect to the destination page
        navigate(destination);
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