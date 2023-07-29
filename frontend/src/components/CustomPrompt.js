import React, { useEffect } from 'react';
import "../prompt.css";

const CustomPrompt = ({ message, onDismiss, closeable }) => {

    useEffect(() => {
        if (closeable) {
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
        }
    }, [closeable, onDismiss]);

    return (
        <div className="modal-overlay" data-testid="prompt">
            <div className="modal-content">
                <p className='break-after-characters'>{message}</p>
                <div className='vertical-center'>
                    {closeable && <button onClick={onDismiss} data-testid="prompt-button">Close</button>}
                </div>

            </div >
        </div>
    );
};

export default CustomPrompt;









