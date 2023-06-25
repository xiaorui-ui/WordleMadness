export default function Header({ user }) {
    return (
        <>
            <header>
                <h1>Wordle Solver</h1>
                <h3> {user.loggedIn && <>{`Hello there, ${user.name}!`}</>} </h3>
            </header>
        </>
    )
}