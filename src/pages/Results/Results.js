// src/components/Results/Results.js
import React, { useState } from 'react';
import { useLocation }     from 'react-router-dom';
import ResultCard          from '../../components/ResultCard/ResultCard';
import Search              from '../../components/Search/Search';
import Banner              from '../../components/Banner/Banner';
import Filter              from '../../components/Filter/Filter';
import './Results.css';

export default function Results() {
  // 1) Grab whatever “results” array was passed in via navigation state
  const { state }      = useLocation();
  const passedResults  = state?.results ?? []; 
  // passedResults is now expected to be an array of objects of shape:
  //   { subjectId, project, site, png_paths: [dailyUrl, summaryUrl] }

  // 2) Control whether the Filter overlay is visible
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="results-container">
      {/* ─── Banner + Filter Toggle ─── */}
      <Banner>
        <button className="filter-toggle" onClick={() => setShowFilter(true)}>
          Filter
        </button>
      </Banner>

      {/* ─── Search Box ─── */}
      <Search className="search-wrapper" />

      {/* ─── Filter Overlay (pop‐up) ─── */}
      {showFilter && <Filter onClose={() => setShowFilter(false)} />}

      {/* ─── Grid of ResultCards ─── */}
      <div className="results-grid">
        {passedResults.map((item) => (
          <ResultCard 
            key={item.subjectId} 
            data={item} 
            className="cards-wrapper" 
          />
        ))}
      </div>
    </div>
  );
}
