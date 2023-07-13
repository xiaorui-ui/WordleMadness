import { useSearchParams } from "react-router-dom";
import IntToColorArray from "./IntToColorArray";
import { useState } from "react";

export default function SplitButton({ changeStatus, index, int, len }) {
    const blockWidth = 100 / len; // Calculate width of each color block

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'none',
        border: 'none',
        width: '200px', // Set desired button width
        height: '50px', // Set desired button height
        position: 'relative', // Add position relative to the button
    };

    const blockStyles = {
        flexBasis: `${blockWidth}%`,
        height: '100%',
        border: '1px solid white',
    };

    const textStyle = {
        position: 'absolute', // Add position absolute to overlay the text
        top: '50%', // Position the text vertically in the center
        left: '50%', // Position the text horizontally in the center
        transform: 'translate(-50%, -50%)', // Center the text precisely
        color: 'white',
        fontWeight: 'bold',
    };

    // const [colorOrder, setColorOrder] = useState([]);

    // setColorOrder(IntToColorArray(int, len));

    return (
        <button style={buttonStyle} onClick={changeStatus(index)}>
            {IntToColorArray(int, len).map((color, index) => (
                <div key={index} style={{ ...blockStyles, backgroundColor: color }}></div>
            ))}
            <span style={textStyle}>{int}</span>
        </button>
    );
}







