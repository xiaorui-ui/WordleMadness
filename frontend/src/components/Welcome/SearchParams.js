const SearchParams = ({ treeWidth, setTreeWidth }) => {

    const handleWidthChange = (event) => {
        setTreeWidth(event.target.value);
    }

    return (
        <>

            <h2 id="Search parameters">Search parameters</h2>


            <p className="break-after-characters">
                At each stage, we shortlist a few possible words and decide which word is indeed the best in a
                bottom-up manner.
                This method is also known as decision trees, while the number of words we take is known as tree width.


                <div style={{ height: "30px" }}></div>

                Pruning method refers to how the words in the answer list are shortlisted.
                Pruning by number of colourings means an allowed word can can give 8 colourings amongst the answers, say,
                is favoured over another word that gives 7.

                <div style={{ height: "30px" }}></div>


                Tree width, as explained before, excludes ties.
                For example, if the tree width is 3, and the top words give 11, 9, 8, 6, ... colourings,
                then we pick the top 3 words as possible candidates.
                But if the top words give 4, 4, 3, 3, 2, ... colourings,
                then we pick the top 4 words as possible candidates instead.

                <div style={{ height: "30px" }}></div>

                Picking a larger tree width means the total tries will possibly be less at the cost of more time.
                The effects are more noticeable with longer answer and allowed lists.
                To customize your own word lists, scroll below.

                <div style={{ height: "30px" }}></div>
            </p>

            <p>Pruning method: # of colourings</p>

            <div style={{ height: "30px" }}></div>

            <p>Tree width from 1-8:</p>
            <input onChange={handleWidthChange} />
        </>);
}

export default SearchParams;