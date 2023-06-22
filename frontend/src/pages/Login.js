import { useNavigate } from 'react-router-dom';
// possible to use the Link function from the same library as well
import { useState } from 'react';
import axios from 'axios';
import CustomPrompt from '../components/CustomPrompt';

// to-do: redirect user to create an account as well?

export default function Login() {

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
        // access the backend here
        if (username.length < 3 && password.length < 3) {
            axios.post('localhost:8080', {
                name: username,
                password: password
            })
            destination = '/';
        } else {
            setShowPrompt(true);
            setPromptMessage("Username bad");
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
                    placeholder="Josh_Wordle" />
                {/*Line break */}
                <br />

                <label>Password:</label><input type='text' value={password} onChange={handlePasswordChange}
                    placeholder="79salet20" />
                <br />
                <div className='space-below'></div>

                {/* Empty space between p/w and submit */}
                <div style={{ height: "30px" }}></div>

                <button type="submit">Submit</button>
            </form>
        </div>



    );
}