// src/components/Banner/Banner.js
import React, { useState } from "react";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as IconSvg } from "../../assets/svg/icon.svg";
import waffle from "../../assets/svg/waffle.svg";
import Filter from "../Filter/Filter";

const Banner = () => {
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const openFilter = () => setShowFilter(true);
  const closeFilter = () => setShowFilter(false);

  const testingHome = () => {
    console.log("navigating home");
    navigate("/");
  };

  return (
    <div className="navigation">
      <div className="navigationBackground" />

      {/* Top-left icon */}
      <button className="topLeftIcon" onClick={testingHome}>
        <IconSvg alt="BOOST icon" className="topLeftIcon-img" />
      </button>

      {/* Waffle filter button */}
      <div className="buttonWrapper">
        <button className="circleButton" onClick={openFilter}>
          <img src={waffle} alt="Filter" className="waffleIcon" />
        </button>
      </div>

      {/* Main nav links */}
      <div className="navButtons">
        <button className="navButton" onClick={() => navigate("/")}>
          Home
        </button>
        <button className="navButton" onClick={() => navigate("/inprogress")}>
          Group Level Analyses
        </button>
      </div>

      {/* Filter popup */}
      {showFilter && <Filter onClose={closeFilter} />}
    </div>
  );
};

export default Banner;
