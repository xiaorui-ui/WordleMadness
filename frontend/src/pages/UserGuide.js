

export default function UserGuide() {

    return (
        <div>
            <div class="sidebar">
                <a href="#Logging-in">Logging In</a><br />
                <a href="#Decision tree">Decision Tree</a><br />
                <a href="#Welcome">Welcome</a><br />
                <a href="#Section-3">Section 3</a><br />
                <a href="#Section-4">Section 4</a><br />
            </div>

            <div class="main-content">
                <h1 id="Title">User Guide</h1>

                <div style={{ height: "10px" }}></div>

                <h2 id="Logging-in"> Logging in </h2>
                <p class="break-after-characters">
                    To log in, you can create a new user by logging in with a new username and password. The first time
                    logging in with your new account will take quite a while, so please by patient :)
                    If the username is already existing but the password is wrong, you will need to create one
                    with another username.

                    <div style={{ height: "30px" }}></div>

                    To use a public account, use "cc" for both name and password.

                    <div style={{ height: "30px" }}></div>

                </p>

                <h2 id="Welcome"> Welcome </h2>
                <p class="break-after-characters">
                    This is the default page when you first enter the web app. You can log in to save your data.

                    <div style={{ height: "30px" }}></div>


                    Users can edit two wordlists, the answer list and the allowed list. What are these?
                    To find the best words to try in Wordle, you need two wordlists,
                    a list of possible answers(answer list) and allowed words(allowed list),
                    the former of which is a subset of the latter. The lists can be edited independently.

                    <div style={{ height: "30px" }}></div>

                    You can add words manually or via a .txt file(if it has many words). There are certain rules
                    the new word added must fulfill, but what's the fun of spoiling them here when you can try
                    it for yourself?

                    <div style={{ height: "30px" }}></div>

                </p>

                <h2 id="Decision tree"> Decision Tree </h2>
                <p class="break-after-characters">
                    Work in progress. Inspire to be like <a href="https://jonathanolson.net/wordle-solver/"> this</a>

                    <div style={{ height: "30px" }}></div>

                </p>

                <h2 id="Section-3"> Decision Tree </h2>
                <p class="break-after-characters">
                    Work in progress. Inspire to be like <a href="https://jonathanolson.net/wordle-solver/"> this</a>

                    <div style={{ height: "30px" }}></div>

                </p>
                <h2 id="Section-4"> Decision Tree </h2>
                <p class="break-after-characters">
                    Work in progress. Inspire to be like <a href="https://jonathanolson.net/wordle-solver/"> this</a>

                    <div style={{ height: "30px" }}></div>

                </p>

                <p>Go to <a href="#Title">top</a>.

                    <div style={{ height: "30px" }}></div>
                    <a href="/">Back to Welcome</a>
                </p>
            </div>
        </div>

    )
}