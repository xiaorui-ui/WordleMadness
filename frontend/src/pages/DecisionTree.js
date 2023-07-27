import { Link } from "react-router-dom";
// import Username from "../components/Username.js";
import Tree from "../components/DecisionTree/Tree.js";


export default function DecisionTree({ user, handleLogOut, bestTree }) {

    return (
        <>
            <div className="sidebar">

                {!user.isLoggedIn ?
                    <>
                        <br />
                        <Link to="/Login">Login to use decision tree</Link>
                        <br />
                    </>
                    :
                    <>
                        <>Hello, {user.name} !</>

                        <div style={{ height: "30px" }}></div>

                        <span onClick={handleLogOut} style={{ cursor: "pointer" }}>Log Out</span>
                        <br />
                    </>
                }
                <Link to="/UserGuide">User Guide</Link>
                <br />
                <Link to="/">Edit Word Lists</Link>
            </div>

            <div className="main-content" >
                <p>Note: This tree is updated the last time compute was pressed within your account,
                    and <i>does not</i> auto-update upon logging in.</p>
                <br />
                <p>Press a colouring to explore the sub-branch! Press it again to collapse it.</p>
                <br />
                {(bestTree === "") ? <>Compute or log in to get tree!</> : <Tree bestTree={bestTree} />}
            </div>
        </>
    )

}