export default function Username({ username, setUsername }) {

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    return (
        <>
            <label>Username</label>
            <br />
            <input type='text' value={username} onChange={handleUsernameChange}
                style={{ width: "500px" }} placeholder="e.g: Josh_Wordle" />
            {/*Line break */}
            <br />
        </>
    );
}