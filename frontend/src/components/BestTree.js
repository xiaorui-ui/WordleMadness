import { BACKEND_COMPUTE } from "./Constants";
import axios from 'axios';

export default function BestTree(answerList, allowedList, setBestTree, user,
    setPromptMessage, setShowPrompt, setCloseable, navigate) {

    function subset(list1, list2) {
        let set = new Set(list2.map(element => element.word));
        for (let i = 0; i < list1.length; i++) {
            if (!set.has(list1[i].word)) {
                setShowPrompt(true);
                setPromptMessage(`Word ${i + 1} of answer, ${list1[i].word}, is not present in allowed!`);
                return false;
            }
        }
        return true;
    }

    function checkValid(list1, list2) {
        if (!user.isLoggedIn) {
            setCloseable(true);
            setPromptMessage("Please login to use the decision tree!");
            setShowPrompt(true);
            return false;
        } else if (list1.length === 0 || list2.length === 0) {
            setCloseable(true);
            setPromptMessage("Lists cannot be empty!");
            setShowPrompt(true);
            return false;
        } else if (list1[0].word.length !== list2[0].word.length) {
            setCloseable(true);
            setPromptMessage("Words in lists need same number of letters!");
            setShowPrompt(true);
            return false;
        } else if (!subset(list1, list2)) {
            setCloseable(true);
            setPromptMessage("Answer needs to be subset of allowed!");
            setShowPrompt(true);
            return false;
        }
        return true;
    }

    let destination = '';

    setCloseable(false);
    setPromptMessage("Loading result...");
    setShowPrompt(true);
    if (!checkValid(answerList, allowedList)) {
        return;
    }
    axios.get(BACKEND_COMPUTE, {
        params: {
            username: user.name
        }
    }).then((response) => {
        console.log(response.data);
        setBestTree(response.data);
        var dict = response.data.child;
        // for (let key in dict) {
        //     console.log(dict[key]);
        // }
        setShowPrompt(false);
        destination = '/DecisionTree';
        navigate(destination);

    }).catch((error) => {
        setCloseable(true);
        setPromptMessage("Error syncing to backend! Please try again later.");
        setShowPrompt(true);
    });
}