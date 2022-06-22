import "./App.css";
import { Routes, Route, Router } from "react-router-dom";
import Main from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:tab" element={<Main />} />
    </Routes>
  );
}

export default App;
