import { HashLink as Link } from 'react-router-hash-link';

export default function Header({ user, firstTime }) {
    return (
        <>
            <header>
                <h1>Wordle Solver</h1>
                <h3 style={{ fontWeight: 'normal' }}>
                    {user.isLoggedIn && <>{`Hello there, ${user.name}!`}</>}
                </h3>
                <p> Read up on our purpose <Link to="UserGuide#Why">here</Link>!</p>

                <p>
                    You can consider trying the txts <a href="https://github.com/xiaorui-ui/WordleTxt/tree/main/txts"
                        target="_blank" rel="noreferrer">here</a>!
                </p>
            </header>
        </>
    )
}