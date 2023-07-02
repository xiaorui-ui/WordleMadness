export default function Password({ passwordValues, setPasswordValues }) {

    const handlePasswordChange = (event) => {
        setPasswordValues({ ...passwordValues, password: event.target.value });
    }

    const handleClickShowPassword = () => {
        setPasswordValues({ ...passwordValues, showPassword: !passwordValues.showPassword });
    };

    return (
        <>
            <label>Password:</label>
            <input type={passwordValues.showPassword ? "text" : "password"}
                value={passwordValues.password} onChange={handlePasswordChange}
                placeholder="e.g: 79salet20">
            </input>

            <button type="button" onClick={handleClickShowPassword}
                style={{ fontSize: "10px", marginLeft: "10px", backgroundColor: "black" }}>
                {passwordValues.showPassword ? "  Hide  " : "        Show  "}
            </button>
        </>
    );
}