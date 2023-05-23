import "./styles.css";
import {useState} from "react";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Wordle Solver</h1>
      </header>
      <main>
        <h2>Add some words you want in your word list.</h2>
        <form>
          <input type="text" />
          <button type="submit">Add</button>
        </form>

        <h1>Word List</h1>
        <table>
          <tr>
            <th>No.</th>
            <th>word</th>
            <th>remove</th>
          </tr>
          <tr>
            <td>0</td>
            <td>crane</td>
            <td>
              <input type="checkbox" checked={false} />
            </td>
          </tr>

          <tr>
            <td>1</td>
            <td>trace</td>
            <td>
              <input type="checkbox" checked={true} />
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>jazzy</td>
            <td>
              <input type="checkbox" checked={false} />
            </td>
          </tr>
        </table>
      </main>
    </div>
  );
}

