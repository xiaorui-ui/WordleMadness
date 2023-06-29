export default function Header({ user, firstTime }) {
    return (
        <>
            <header>
                <h1>Wordle Solver</h1>
                <h3 style={{ fontWeight: 'normal' }}>
                    {user.isLoggedIn && <>{`Hello there, ${user.name}!`}</>}
                    {firstTime && <> First time here, isn't it?</>}
                </h3>
            </header>
        </>
    )
}