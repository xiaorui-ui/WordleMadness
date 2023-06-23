/**
 * @jest-environment jsdom
 */

import { cleanup, fireEvent, getByText, queryAllByTestId, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Welcome from '../pages/Welcome';

afterEach(cleanup);

test("submit number", () => {
    const { queryByLabelText, getByLabelText } = render(
        <Welcome />,
    );

    const input = screen.queryAllByTestId("add-word-input")[0];
    fireEvent.change(input, { target: { value: "45t" } });

    const addButton = screen.getAllByTestId("add-button")[0];
    fireEvent.click(addButton);

    expect(screen.getAllByTestId("prompt")[0]).toBeTruthy();
});



