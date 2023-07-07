import { Link } from "react-router-dom";
// import { BACKEND_COMPUTE } from "../components/Constants.js";
import Username from "../components/Username.js";
import { useState } from "react";
import axios from 'axios';


export default function DecisionTree({ answerList, allowedList, user, handleLogOut }) {

    // insert post request
    // call on the algorithm here :)
    const [bestWord, setBestWord] = useState("boi");

    // dummy function
    const handleCompute = () => {
    }


    // const handleCompute = () => {
    //     axios.get(BACKEND_COMPUTE, {
    //         params: {
    //             username: user.name
    //         }
    //     }).then((response) => {
    //         setBestWord(response.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

    // implement checks here


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

            <div className="main-content" >
                <button onClick={handleCompute}>click me</button>
                <p>{bestWord}</p>
            </div>
        </>
    )

}