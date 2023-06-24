import { useState } from "react";

export default function WordList({ words, onWordChange }) {

    const handleChange = (i) => () => {
        console.log(i);
        onWordChange(i);
    }

    return (
        <>
            <table>
                <thead>
                    <tr height="100px">
                        <th>No.</th>
                        <th>word</th>
                        <th>remove</th>
                    </tr>
                </thead>
                <tbody data-testid="table-body">
                    {
                        words.map((word, i) => {
                            return (
                                <tr key={i} height="30px">
                                    <td>{i}</td>
                                    <td data-testid="word">{word.word}</td>
                                    <td><input type="checkbox" checked={word.remove} onChange={handleChange(i)}
                                        data-testid="checkbox" /></td>
                                </tr>

                            )
                        })
                    }
                </tbody>



            </table>
            {words.length === 0 && (<p>Add in some words!</p>)}
        </>
    )
}