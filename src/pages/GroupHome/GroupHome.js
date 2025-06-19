// src/pages/GroupHome/GroupHome.js
import React from "react";
import { useNavigate } from "react-router-dom";

import Banner from "../../components/Banner/Banner";
import "./GroupHome.css";

const GroupHome = () => {
  const navigate = useNavigate();

  return (
    <div className="grouphome-container">
      {/* top banner */}
      <Banner />
      <div className="title-container">
        <div className="page-title">Group Plots</div>
        <div className="title-divider"></div>
        <div className="page-subtitle">
          Click on a task group to see its group plots.
        </div>
      </div>


      {/* 3×2 grid of buttons */}
      <div className="button-grid">
        <div className="button-wrapper">
          <button onClick={() => navigate("/group/observational")}>
            Observational Study & Intervention Study - All Sessions
          </button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate("/group/intervention-1")}>
            Intevention Study - Session 1 
          </button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate("/group/intervention-2")}>
            Intevention Study - Session 2 
          </button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate("/group/intervention-3")}>
            Intevention Study - Session 3 
          </button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate("/group/intervention-4")}>
            Intevention Study - Session 4 
          </button>
        </div>
        <div className="button-wrapper">
          <button onClick={() => navigate("/group/intervention-5")}>
            Intevention Study - Session 5 
          </button>
        </div>
      </div>
  </div>
  );
};

export default GroupHome;
