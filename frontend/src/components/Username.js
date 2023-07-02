export default function Username({ username, setUsername }) {

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    return (
        <>
            <label>Username:</label>
            <input type='text' value={username} onChange={handleUsernameChange}
                placeholder="e.g: Josh_Wordle" />
            {/*Line break */}
            <br />
        </>
    );
}