import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import InProgress from "./pages/InProgress/InProgress";
import Results from "./pages/Results/Results";
import './App.css';




function App() {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inprogress" element={<InProgress />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
