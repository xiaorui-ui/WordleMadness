export default function SplitButton({ changeStatus, index, int, len, word }) {
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
        // fontFamily: 'HelveticaNeue',
        fontFamily: 'Cambria',
        fontWeight: 'bold',
        fontSize: '18px',
        display: 'flex', // Add flex display
        justifyContent: 'center', // Center the content horizontally
        alignItems: 'center', // Center the content vertically
    };

    // consider splitting this function into its own file
    function IntToColorArray(x, len) {
        const colors = ["#707070", "goldenrod", "green"];
        var ans = [];
        for (let i = 0; i < len; i++) {
            ans.unshift(colors[x % 3]);
            x = Math.floor(x / 3);
        }
        // console.log(ans);
        return ans;
    }

    return (
        <button style={buttonStyle} onClick={changeStatus(index)}>
            {IntToColorArray(int, len).map((color, i) => (
                <div key={i} style={{ ...blockStyles, backgroundColor: color }}>{word[i].toUpperCase()}</div>
            ))}
        </button>
    );
}







