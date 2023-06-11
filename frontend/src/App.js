import "./styles.css";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

