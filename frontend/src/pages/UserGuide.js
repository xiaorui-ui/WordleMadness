import { Link } from "react-router-dom";
import textInput from '../txtInput.png';

export default function UserGuide({ user, handleLogOut }) {


    return (
        <div>
            <div id="sidebar" className="sidebar">
                {
                    user.isLoggedIn && <div>{`Hi, ${user.name}!`}</div>
                }<br />
                <h2 style={{ fontWeight: 'normal' }}>Sections</h2>
                <a href="#Logging-in">Logging In</a><br />
                <a href="#Welcome">Welcome</a><br />
                <a href="#Decision tree">Decision Tree</a><br />

                <div style={{ height: "50px" }}></div>

                <h2 style={{ fontWeight: 'normal' }}>Pages</h2>
                <Link to="/">Edit Word Lists</Link> <br />
                <Link to="/DecisionTree">Decision Tree</Link> <br />
                {user.isLoggedIn ?
                    <>
                        <span onClick={handleLogOut} style={{ cursor: "pointer" }}>Log Out</span> <br />

                    </> :
                    <Link to="/Login">Log in to save your data</Link>
                }

            </div>

            <div id="content" className="main-content">
                <h1 id="Title">User Guide</h1>

                <div style={{ height: "10px" }}></div>

                We're here to help!

                <h2 id="Logging-in"> Logging in </h2>
                <p className="break-after-characters">
                    You can either log in to an existing account or register for a new account . The first time
                    logging in with your new account will take quite a while, so please by patient :)
                    If the username is already existing but the password is wrong, you will need to create one
                    with another username, or try to recall your password.

                    <div style={{ height: "30px" }}></div>

                    To use a public account, use "ccc" for both username and password.
                    <div style={{ height: "30px" }}></div>

                </p>

                <h2 id="Welcome"> Welcome </h2>
                <p className="break-after-characters">
                    This is the default page when you first enter the web app. You can log in to save your data.

                    <div style={{ height: "30px" }}></div>


                    Users can edit two wordlists, the answer list and the allowed list. What are these?
                    To find the best words to try in Wordle, you need two wordlists,
                    a list of possible answers(answer list) and allowed words(allowed list),
                    the former of which is a subset of the latter. The lists can be edited independently.

                    <div style={{ height: "30px" }}></div>

                    You can add words manually or via a .txt file(if it has many words). If you're adding a .txt file, make sure
                    every word is in a new line, as per the example below, otherwise the behaviour may be unexpected. There are
                    certain rules the new word added must fulfill, why not try them out for yourself?

                    <div style={{ height: "30px" }}></div>

                    <img src={textInput} alt="Logo" style={{ width: "300px", height: "350px" }} />

                    <div style={{ height: "30px" }}></div>

                    Due to technical limitations, we can't handle lists that are too long at the moment. The web app can handle
                    answer lists a few hundred words long and allowed lists a few thousand words long.

                </p>

                <h2 id="Decision tree"> Decision Tree </h2>
                <p className="break-after-characters">
                    At long last, after 2 months of hard work(amongst juggling other commitments), the decision tree is finally available!
                    To use this feature, you have to be logged in.

                    <div style={{ height: "30px" }}></div>

                    In the decision tree page, click the "click me" button to get the tree(this is subjected to change).
                    Do be patient as the algorithm is somewhat involved and involves tree search(pun intended)
                    since there are no known simpler ways to solve Wordle fully;
                    waiting times of up to a few minutes is perfectly normal for larger lists.
                    To navigate into a branch of the decision tree, simply click on it. To hide it, click on it again.

                    <div style={{ height: "30px" }}></div>

                    There's a line of text on top every time you click open a branch. "<i>x</i> words" means <i>x</i> words
                    in the answer list belongs to the current branch of the decision tree."... tries total" means that number
                    of tries is needed in total for all words in that branch from the given point onwards. Notice that the
                    colourings are sorted in order of grey, gold, green, from the first to the last letter, so that it is easier
                    for you to search for your desired colouring!

                    <div style={{ height: "20px" }}></div>

                    Best word and number of colourings should be self-explanatory. An important caveat is that is the best word
                    is often not unique, especially for smaller answer lists or branches. Fun fact: Due to the use of parallelism
                    in the algorithm, the answer may not always be consistent across different tries, especially for larger lists!

                    <div style={{ height: "30px" }}></div>

                    Our inspiration: <a href="https://jonathanolson.net/wordle-solver/" target="_blank" rel="noreferrer">
                        Johnathan Olson Wordle Solver</a>
                </p>

                <div style={{ height: "50px" }}></div>

                <p>Go to <a href="#Title">top</a>.
                </p>
            </div>
        </div>

    )
}