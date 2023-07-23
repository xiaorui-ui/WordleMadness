import { Link } from 'react-router-dom';

export default function Header({ user, firstTime }) {
    return (
        <>
            <header>
                <h1>Wordle Solver</h1>
                <h3 style={{ fontWeight: 'normal' }}>
                    {user.isLoggedIn && <>{`Hello there, ${user.name}!`}</>}
                </h3>
                <p> Feeling confused? Read up on our purpose <Link to="/UserGuide#why">here</Link>!</p>

                <p>
                    You can consider trying the txts <a href="https://github.com/xiaorui-ui/WordleTxt"
                        target="_blank" rel="noreferrer">here</a>!
                </p>
            </header>
        </>
    )
}