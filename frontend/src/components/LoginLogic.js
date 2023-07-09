// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_LOGIN, BACKEND_REGISTER } from '../components/Constants.js';

export default function LoginLogic(setUser, username, passwordValues, setShowPrompt, setPromptMessage, type,
    navigate) {

    // const navigate = useNavigate();

    const handleInvalidLogin = (data) => {
        setShowPrompt(true);
        setPromptMessage(data);
    }

    const handleInvalidRegistration = () => {
        setShowPrompt(true);
        setPromptMessage("User already exists! Please register with a different username.");
    }

    let destination = '';

    const handleLogin = () => {
        setShowPrompt(true);
        setPromptMessage("Logging in...");
        axios.get(BACKEND_LOGIN, {
            params: {
                name: username,
                password: passwordValues.password
            }
        })
            .then((response) => {
                if (response.data === "Logged in") {
                    setUser({ name: username, isLoggedIn: true });
                    sessionStorage.setItem("user", username);
                    destination = '/';
                    navigate(destination);
                } else {
                    handleInvalidLogin(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleRegister = () => {
        if ((0 < username.length && username.length <= 10 &&
            3 <= passwordValues.password.length && passwordValues.password.length <= 10)) {
            setShowPrompt(true);
            setPromptMessage("Registering...");
            axios.post(BACKEND_REGISTER, {}, {
                params: {
                    name: username,
                    password: passwordValues.password
                }
            })
                .then((response) => {
                    if (response.data === "Registered") {
                        setUser({ name: username, isLoggedIn: true });
                        sessionStorage.setItem("user", username);
                        destination = '/';
                        navigate(destination);
                    } else {
                        handleInvalidRegistration();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else if (username.length === 0) {
            setShowPrompt(true);
            setPromptMessage("Please set a username");
        } else if (passwordValues.password.length < 3) {
            setShowPrompt(true);
            setPromptMessage("Please enter a password with at least 3 characters");
        } else {
            setShowPrompt(true);
            setPromptMessage("Please enter a username and password with at most 10 characters each");
        }
    }

    if (type === "Login") {
        handleLogin();
    } else if (type === "Register") {
        handleRegister();
    }
}