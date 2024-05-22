// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BenefitSelection from "./components/BenefitSelection";
import Summary from "./components/Summary";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BenefitSelection />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
};

export default App;
