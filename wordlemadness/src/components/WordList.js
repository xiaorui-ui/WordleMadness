import {useState} from "react";

export default function WordList({words, onWordChange}) {

    const handleChange = (i) => () => {
        console.log(i);
        onWordChange(i);
    }

    return (
        <>
            <h1>Word List</h1>
            <table>
                <tr>
                    <th>No.</th>
                    <th>word</th>
                    <th>remove</th>
                </tr>
                {
                    words.map((word, i) => {
                        return (
                            <tr key = {i}>
                                <td>{i}</td>
                                <td>{word.word}</td>
                                <td><input type="checkbox" checked={word.remove} onChange = {handleChange(i)}/></td>
                            </tr>
                        )
                    })
                }
                
            </table>
        </>
    )
}