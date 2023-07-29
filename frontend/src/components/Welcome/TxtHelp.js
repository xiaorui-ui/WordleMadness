// same as Custom Prompt, except the message is fixed and needs to be well-formatted
// onDismiss is the standard bahaviour, closeable = true

import { HashLink as Link } from 'react-router-hash-link';

const TxtHelp = ({ setShowTxtHelp }) => {

    const handleDismiss = () => {
        setShowTxtHelp(false);
    }

    return (
        <div className="modal-overlay" data-testid="prompt">
            <div className="modal-content">
                <p className='break-after-characters'>

                    If you intend to use your own txt, ensure that all words are valid.
                    For an example format, refer <Link to="UserGuide#Sample Img">here</Link>,
                    though you need not strictly follow it. Alternatively,
                    you can consider trying the txts <a href="https://github.com/xiaorui-ui/WordleTxt/tree/main/txts"
                        target="_blank" rel="noreferrer">here</a>!

                    <div style={{ height: "30px" }}></div>

                    The txt word lists adds words in addition to those already present, instead of replacing them.
                    This means you can contatenate words from several lists.
                    Since there are no duplicates in the word lists,
                    duplicated words will automatically be filtered out.
                    So fret not if some words from your .txt file "vanished"!

                    <div style={{ height: "30px" }}></div>

                    To set the allowed to be same as answer, press the "Set lists to same" button between the two lists.
                </p>
                <div className='vertical-center'>
                    <button onClick={handleDismiss} data-testid="prompt-button">Close</button>
                </div>

            </div >
        </div>
    );
}

export default TxtHelp;