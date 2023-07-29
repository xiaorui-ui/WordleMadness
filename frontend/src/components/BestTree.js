import { BACKEND_COMPUTE } from "./Constants";
import axios from 'axios';

export default function BestTree(answerList, allowedList, treeWidth, setBestTree, user,
    setPromptMessage, setShowPrompt, setCloseable, navigate) {

    const timeOutMessage = "Computing of tree took too long! Please make sure your words have been entered correctly";

    const jsonErrorMessage = "Error occurred when processing list!";

    const str = "\n Press the enter key or close to continue.";

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
        if (list1.length === 0 || list2.length === 0) {
            setCloseable(true);
            setPromptMessage("Lists cannot be empty!" + str);
            setShowPrompt(true);
            return false;
        } else if (list1[0].word.length !== list2[0].word.length) {
            setCloseable(true);
            setPromptMessage("Words in lists need same number of letters!" + str);
            setShowPrompt(true);
            return false;
        } else if (list1.length * list2.length > 35000000) {
            setCloseable(true);
            setPromptMessage("Answer list size multiplied by allowed list size cannot exceed 35 million!" + str);
            setShowPrompt(true);
            return false;
        } else if (!subset(list1, list2)) {
            setCloseable(true);
            setPromptMessage("Answer needs to be subset of allowed!" + str);
            setShowPrompt(true);
            return false;
        }
        return true;
    }

    function validTreeWidth(treeWidth) {
        var arr = ["1", "2", "3", "4", "5", "6", "7", "8"];
        if (arr.includes(treeWidth)) {
            return true;
        }
        setCloseable(true);
        setPromptMessage("Tree width needs to be a whole number from 1-8!" + str);
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
    const guestAnswerList = user.isLoggedIn ? [] : answerList.map(word => word.word);
    const guestAllowedList = user.isLoggedIn ? [] : allowedList.map(word => word.word);
    axios.patch(BACKEND_COMPUTE, 
        {
            wordList: guestAnswerList,
            allowedList: guestAllowedList
        }, {
        params: {
            username: user.name,
            width: width
        }
    }).then((response) => {
        const responseString = response.data;
        if (responseString === timeOutMessage || responseString === jsonErrorMessage) {
            setPromptMessage(responseString + str);
            setCloseable(true);
            setShowPrompt(true);
            return;
        }
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
        setPromptMessage("Error syncing to backend! Please try again later." + str);
        setShowPrompt(true);
    });
}