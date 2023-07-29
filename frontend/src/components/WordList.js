// implement scrolling bar within word list

export default function WordList({ words, onWordChange }) {

    const handleChange = (i) => () => {
        onWordChange(i);
    }

    return (
        <div className="table-container" style={{ maxHeight: "500px", maxWidth: "700px", overflow: "auto" }}>
            <table>
                <thead>
                    <tr style={{ height: "80px", fontSize: "18px" }}>
                        <th className="th-1">No.</th>
                        <th className="th-2">Word</th>
                        <th className="th-3">Remove</th>
                    </tr>
                </thead>
                <tbody data-testid="table-body">
                    {
                        words.map((word, i) => {
                            return (
                                <tr key={i} height="30px">
                                    <td>{i + 1}</td>
                                    <td data-testid="word">{word.word}</td>
                                    <td><input type="checkbox" checked={word.remove} onChange={handleChange(i)}
                                        style={{ width: "25px" }}
                                        id="cb1" data-testid="checkbox" /></td>
                                </tr>

                            )
                        })
                    }
                </tbody>



            </table>
            {words.length === 0 && (<p>Add in some words!</p>)}
        </div>
    )
}