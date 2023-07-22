import axios from 'axios';
import { BACKEND_LOGIN, BACKEND_REGISTER } from '../Constants.js';

export default function LoginLogic(setUser, username, passwordValues, setShowPrompt, setPromptMessage, setCloseable, type,
    navigate) {

    const handleInvalidLogin = (data) => {
        setCloseable(true);
        setPromptMessage(data);
        setShowPrompt(true);
    }

    const handleInvalidRegistration = () => {
        setCloseable(true);
        setPromptMessage("User already exists! Please register with a different username.");
        setShowPrompt(true);
    }

    let destination = '';

    const handleLogin = () => {
        setCloseable(false);
        setPromptMessage("Logging in...");
        setShowPrompt(true);
        axios.patch(BACKEND_LOGIN, {}, {
            params: {
                name: username,
                password: passwordValues.password
            }
        })
            .then((response) => {
                setShowPrompt(false);
                if (response.data === "Logged in") {
                    setUser({ name: username, isLoggedIn: true });
                    sessionStorage.setItem("wordle-user", username);
                    destination = '/';
                    navigate(destination);
                } else {
                    handleInvalidLogin(response.data);
                }
            })
            .catch((error) => {
                setCloseable(true);
                setPromptMessage("Error logging in! Please try again later.");
                setShowPrompt(true);
            });
    }

    const handleRegister = () => {
        if ((0 < username.length && username.length <= 10 &&
            3 <= passwordValues.password.length && passwordValues.password.length <= 10)) {
            setCloseable(false);
            setPromptMessage("Registering...");
            setShowPrompt(true);
            axios.post(BACKEND_REGISTER, {}, {
                params: {
                    name: username,
                    password: passwordValues.password
                }
            })
                .then((response) => {
                    setShowPrompt(false);
                    if (response.data === "Registered") {
                        setUser({ name: username, isLoggedIn: true });
                        sessionStorage.setItem("wordle-user", username);
                        destination = '/';
                        navigate(destination);
                    } else {
                        handleInvalidRegistration();
                    }
                })
                .catch((error) => {
                    setCloseable(true);
                    setPromptMessage("Error registering user! Please try again later.");
                    setShowPrompt(true);
                });
        } else if (username.length === 0) {
            setCloseable(true);
            setPromptMessage("Please set a username");
            setShowPrompt(true);
        } else if (passwordValues.password.length < 3) {
            setCloseable(true);
            setPromptMessage("Please enter a password with at least 3 characters");
            setShowPrompt(true);
        } else {
            setCloseable(true);
            setPromptMessage("Please enter a username and password with at most 10 characters each");
            setShowPrompt(true);
        }
    }

    if (type === "Login") {
        handleLogin();
    } else if (type === "Register") {
        handleRegister();
    }
}