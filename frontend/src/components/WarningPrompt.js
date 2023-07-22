import React, { useEffect } from 'react';
import "../prompt.css";

const WarningPrompt = ({ message, onDismiss, onSave }) => {

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
                    <button onClick={onDismiss} data-testid="prompt-button">Cancel</button>
                    <button onClick={onSave} data-testid="prompt-button">Continue</button>
                </div>
            </div >
        </div>
    );
};

export default WarningPrompt;









