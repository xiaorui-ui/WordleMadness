import { useState } from "react";
import Select from 'react-select';

const SearchParams = ({ treeWidth, setTreeWidth }) => {

    const handleWidthChange = (event) => {
        setTreeWidth(event.target.value);
    }

    const [selectedOption, setSelectedOption] = useState('');
    const [hoveredOption, setHoveredOption] = useState('');
    const options = [1, 2, 3, 4, 5, 6, 7, 8].map(i => {
        return { value: i, label: i };
    })

    const handleOptionChange = (x) => {
        setSelectedOption(x);
        setTreeWidth(Number(x.value));
        console.log(Number(x.value));
        console.log(typeof Number(x.value));
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? 'red' : 'black',
            cursor: 'pointer',
        }),
    };

    return (
        <>

            <h2 id="Search parameters">Search parameters</h2>


            <p className="break-after-characters">
                At each stage, we shortlist a few possible words and decide which word is indeed the best in a
                bottom-up manner.
                This method is also known as decision trees, while the number of words we take is known as tree width.
                By best, we mean least number of average guesses.


                <div style={{ height: "30px" }}></div>

                Pruning method refers to how the words in the answer list are shortlisted.
                Pruning by number of colourings means an allowed word can can give 8 colourings amongst the answers, say,
                is favoured over another word that gives 7.

                <div style={{ height: "30px" }}></div>

                It is worth mentioning that the word with the most number of colourings need not be the best word,
                which is why we care about the width of the decision tree in the first place.
                The smallest counter-example we are aware of with common words is counter_example.txt,
                which we provided in the link.
                However, number of colourings is still a decent and quick method at predicting which word is the best,
                which is why we chose it to be the pruning method in the first place.

                <div style={{ height: "30px" }}></div>

                Picking a larger tree width means the total tries will possibly be less at the cost of time.
                The effects are more noticeable with longer answer and allowed lists.
                To customize your own word lists, scroll down.

                <div style={{ height: "30px" }}></div>
            </p>

            <p>Pruning method: # of colourings</p>

            <div style={{ height: "30px" }}></div>

            <p>Tree width from 1-8:</p>
            <div style={{ width: "150px" }}>
                <Select
                    value={selectedOption}
                    options={options}
                    isSearchable={false}
                    onChange={handleOptionChange}
                    styles={customStyles}
                />
            </div>
        </>);
}

export default SearchParams;

