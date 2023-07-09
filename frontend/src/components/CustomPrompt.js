import React, { useEffect } from 'react';
import "../prompt.css";

const CustomPrompt = ({ message, onDismiss }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === ':' || event.key === 'Enter') {
                event.preventDefault();
                onDismiss();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onDismiss]);

    return (
        <div className="modal-overlay" data-testid="prompt">
            <div className="modal-content">
                <p>{message}</p>
                <div className='vertical-center'>
                    <button onClick={onDismiss} data-testid="prompt-button">Close</button>
                </div>

            </div >
        </div>
    );
};

export default CustomPrompt;









