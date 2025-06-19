import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import InProgress from "./pages/InProgress/InProgress";
import Results from "./pages/Results/Results";
import GroupHome from "./pages/GroupHome/GroupHome";
import Group from "./pages/Group/Group";
import './App.css';




function App() {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inprogress" element={<InProgress />} />
            <Route path="/results" element={<Results />} />
            <Route path="/group" element={<GroupHome />} />
            <Route path="/group/:groupName" element={<Group />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
