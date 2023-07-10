/**
 * @jest-environment jsdom
 */

import { cleanup, fireEvent, getByText, queryAllByTestId, queryByLabelText, render, screen }
    from '@testing-library/react';
import { within } from '@testing-library/dom'
import '@testing-library/jest-dom'
import Welcome from '../pages/Welcome';

afterEach(cleanup);



test("submit word", () => {
    // query... will return null, whereas get... will return an error

    const defaultWords = [
        { word: "crane", remove: false },
        { word: "jazzy", remove: true },
        { word: "fjord", remove: false },
    ];


    const { queryByLabelText, getByLabelText } = render(
        <Welcome wordList={defaultWords} />,
    );


    const input = screen.queryAllByTestId("add-word-input")[0];
    const addButton = screen.getAllByTestId("add-button")[0];

    // submit number
    fireEvent.change(input, { target: { value: "45t" } });
    fireEvent.click(addButton);
    // html element contains the toMatch parameter
    expect(screen.getAllByTestId("")[0].textContent).toMatch(/only letters/);


    // remove prompt
    fireEvent.click(screen.getAllByTestId("prompt-button")[0]);
    // query... will return null, whereas get... will return an error
    expect(screen.queryByTestId("prompt")).not.toBeInTheDocument();


    // submit word with wrong # of letters
    fireEvent.change(input, { target: { value: "summon" } });
    fireEvent.click(addButton);
    // we could escape regexp but that would be hard
    expect(screen.getAllByTestId("prompt")[0].textContent).toMatch(/with 5 letter/);



    // submit word already present
    fireEvent.click(screen.getAllByTestId("prompt-button")[0]);
    fireEvent.change(input, { target: { value: "jazzy" } });
    fireEvent.click(addButton);
    expect(screen.getAllByTestId("prompt")[0].textContent).toMatch(/already in the list/);



    // valid submission
    fireEvent.click(screen.queryAllByTestId("prompt-button")[0]);
    fireEvent.change(input, { target: { value: "found" } });
    fireEvent.click(addButton);
    expect(screen.queryAllByTestId("prompt")).toEqual([]);
    // expect 4 words
    expect(screen.getAllByTestId("table-body")[0].rows.length).toEqual(4);

});

test("remove words", () => {

    const defaultWords = [
        { word: "crane", remove: false },
        { word: "jazzy", remove: true },
        { word: "fjord", remove: false },
    ];


    const { queryByLabelText, getByLabelText } = render(
        <Welcome wordList={defaultWords} />,
    );

    // in this test case we will work on the 2nd table
    const row2 = screen.getAllByTestId("table-body")[1].rows[1];
    expect(row2).toBeTruthy();
    const row3 = screen.getAllByTestId("table-body")[1].rows[2];

    // console.log("row2: " + row2.textContent);
    // console.log("row3: " + row3.textContent);


    // toggle 2nd word
    fireEvent.click(within(row2).getByTestId("checkbox"));
    // remove selected words
    // 2nd word was originally selected, so nothing is selected
    fireEvent.click(screen.getAllByTestId("remove-selected")[1]);
    expect(screen.getAllByTestId("table-body")[1].rows.length).toEqual(3);

    // toggle row 3, toggle row 2, 
    // then toggle row 3 (cancel out w/ 1st op)
    fireEvent.click(within(row3).getByTestId("checkbox"));
    fireEvent.click(within(row2).getByTestId("checkbox"));
    fireEvent.click(within(row3).getByTestId("checkbox"));
    fireEvent.click(screen.getAllByTestId("remove-selected")[1]);
    expect(screen.getAllByTestId("table-body")[1].rows.length).toEqual(2);
    expect(screen.getAllByTestId("table-body")[1].rows[0].textContent).toMatch(/crane/);
    expect(screen.getAllByTestId("table-body")[1].rows[1].textContent).toMatch(/fjord/);

    // row2 gets replaced by the new contents of row 2 when it is re-rendered
    // console.log("row2: " + row2.textContent);
    // console.log("row3: " + row3.textContent);

    // test remove all
    fireEvent.click(screen.getAllByTestId("remove-all")[1]);
    expect(screen.getAllByTestId("table-body")[1].rows.length).toEqual(0);

});

test("set same", () => {

    const defaultWords = [
        { word: "crane", remove: false },
        { word: "jazzy", remove: true },
        { word: "fjord", remove: false },
    ];


    render(<Welcome wordList={defaultWords} />,);

    // after setting same, the 2nd AddWord component will vanish
    fireEvent.click(screen.getByTestId("set-same-diff"));
    expect(screen.getAllByTestId("table-body").length).toEqual(1);
    expect(screen.getAllByTestId("add-word-form").length).toEqual(1);

    // comes back
    fireEvent.click(screen.getByTestId("set-same-diff"));
    expect(screen.getAllByTestId("table-body").length).toEqual(2);
    expect(screen.getAllByTestId("add-word-form").length).toEqual(2);

})

test("txt-addition", () => { });





