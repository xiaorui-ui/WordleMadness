import { Link } from "react-router-dom"


export default function DecisionTree({ answerList, allowedList, user, handleLogOut }) {

    // insert post request
    // call on the algorithm here :)
    return (

        <>
            <div className="sidebar">
                <br />
                {!user.isLoggedIn ?
                    <>
                        <Link to="/Login">Login to save your data</Link>
                        <br />
                    </>
                    :
                    <>
                        <span onClick={handleLogOut} style={{ cursor: "pointer" }}>Log Out</span>
                        <br />
                    </>
                }
                <Link to="/UserGuide">User Guide</Link>
                <br />
                <Link to="/">Edit Word Lists</Link>
            </div>

            <p className="main-content" > salet, 7920 </p>
        </>
    )

}