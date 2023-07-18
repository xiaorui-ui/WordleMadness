import WarningPrompt from "./WarningPrompt";
import axios from 'axios';
import { BACKEND_SET_LISTS_TO_SAME } from "./Constants";
import CustomPrompt from "./CustomPrompt";

export default function SetListsToSame({ answerList, setAllowedList, showWarningPrompt, setShowWarningPrompt, 
    warningPromptMessage, setWarningPromptMessage, showPrompt, setShowPrompt, promptMessage, setPromptMessage,
    closeable, setCloseable, user }) {

    const handleSave = () => {
        setShowWarningPrompt(false);
        setPromptMessage("Settng word lists to be the same...")
        setCloseable(false);
        setShowPrompt(true);
        setAllowedList(answerList);
        if (user.isLoggedIn) {
            axios.patch(BACKEND_SET_LISTS_TO_SAME, {}, { params: { username: user.name } })
                .then((response) => {
                    setShowPrompt(false);
                })
                .catch((error) => {
                    setCloseable(true);
                    setPromptMessage("Error syncing to backend! Please try again later.");
                    setShowPrompt(true);
                });
        } else {
            setShowPrompt(false);
        }
    }

    const handleDismissWarning = () => {
        setShowWarningPrompt(false);
    }

    const handleDismiss = () => {
        setShowPrompt(false);
    }

    const handleClick = () => {
        setWarningPromptMessage("You are about to change the allowed word list to be the same as the answer word list. \n"
            + "This action is irreversible. Do you wish to continue?");
        setShowWarningPrompt(true);
    }

    return (
        <>
        {showPrompt && (<CustomPrompt message={promptMessage} onDismiss={handleDismiss} closeable={closeable} />)}
        {showWarningPrompt && (<WarningPrompt message={warningPromptMessage} onDismiss={handleDismissWarning} onSave={handleSave} />)}
        <button type="click" onClick={handleClick} data-testid="set-same-diff" className="button-2">
            Set lists to same </button>
        </>
    );
}