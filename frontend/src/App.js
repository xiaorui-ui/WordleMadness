import "./styles.css";
import Welcome from "./pages/Welcome.js";
import Login from "./pages/Login.js";
import UserGuide from "./pages/UserGuide.js";
import DecisionTree from "./pages/DecisionTree.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/decisionTree" element={<DecisionTree />} />
          <Route path="/userGuide" element={<UserGuide />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

