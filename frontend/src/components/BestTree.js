import { BACKEND_COMPUTE } from "./Constants";
import axios from 'axios';

export default function BestTree(answerList, allowedList, treeWidth, setBestTree, user,
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

    function validTreeWidth(treeWidth) {
        console.log(treeWidth);
        console.log(typeof treeWidth);
        var arr = ["1", "2", "3", "4", "5", "6", "7", "8"];
        if (arr.includes(treeWidth)) {
            return true;
        }
        setCloseable(true);
        setPromptMessage("Tree width needs to be a whole number from 1-8");
        setShowPrompt(true);
        return false;
    }

    let destination = '';

    setCloseable(false);
    setPromptMessage("Loading result...");
    setShowPrompt(true);
    if (!validTreeWidth(treeWidth)) {
        return;
    }
    if (!checkValid(answerList, allowedList)) {
        return;
    }
    var width = parseInt(treeWidth) - 1;
    axios.patch(BACKEND_COMPUTE, {}, {
        params: {
            username: user.name,
            width: width
        }
    }).then((response) => {
        setBestTree(response.data);
        // var dict = response.data.child;
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