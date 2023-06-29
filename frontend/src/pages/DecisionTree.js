

export default function DecisionTree({ answerList, allowedList, user, handleLogOut }) {

    // insert post request
    // call on the algorithm here :)
    return (

        <>
            <div className="sidebar">
                <br />
                {!user.isLoggedIn ?
                    <>
                        <a href="/Login">Login to save your data</a>
                        <br />
                    </>
                    :
                    <>
                        <span onClick={handleLogOut} style={{ cursor: "pointer" }}>Log Out</span>
                        <br />
                    </>
                }
                <a href="/UserGuide">User Guide</a>
                <br />
                <a href="/">Edit Word Lists</a>
            </div>

            <p className="main-content" > salet, 7920 </p>
        </>
    )

}