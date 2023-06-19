import "./styles.css";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import UserGuide from "./pages/UserGuide";
import DecisionTree from "./pages/DecisionTree";
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

