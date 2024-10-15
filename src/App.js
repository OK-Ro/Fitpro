import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FitnessTracker from "./pages/FitnessTracker";

function App() {
  return (
    <Router>
      <div className="App bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fitness-tracker" element={<FitnessTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
