import { useNavigate } from 'react-router-dom';
// possible to use the Link function from the same library as well
import { useState } from 'react';

// to-do: redirect user to create an account as well?

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Determine the destination based on username and password
        let destination = '';

        // change the logic to whatever appropriate
        if (username.length < 3 && password.length < 3) {
            destination = '/welcome';
        } else {
            return prompt('Bad username/password!');
            destination = '/';
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
        <div className='Login'>
            <form id="Login" onSubmit={handleSubmit}>
                {'Username:'}<input type='text' value={username} onChange={handleUsernameChange} />
                {/*Line break */}
                <br />
                {'Password:'}<input type='text' value={password} onChange={handlePasswordChange} />

                <button type="submit">Submit</button>
            </form>
        </div >
    );
}