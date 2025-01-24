import React from "react";
import SearchPage from "./components/SearchPage";
import Canvas from "./components/Canvas";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/edit" element={<Canvas />} />
      </Routes>
    </Router>
  );
};

export default App;
