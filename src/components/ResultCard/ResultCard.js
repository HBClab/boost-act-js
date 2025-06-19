
import React from 'react';
import './ResultCard.css';

const ResultCard = ({ data }) => {
  const { subjectId, project, site, png_paths } = data;

  if (!Array.isArray(png_paths) || png_paths.length < 2) {
    return (
      <div className="card error">
        <div className="card-header">
          <div className="card-title">Invalid data for {subjectId}</div>
        </div>
        <div className="card-body">Missing or malformed png_paths</div>
      </div>
    );
  }

  // The data.json order is [daily, summary], but we want summary on top:
  const dailyImageUrl   = png_paths[0];
  const summaryImageUrl = png_paths[1];

  // You can override these via CSS variables if you like:
  const DEFAULT_CARD_HEIGHT    = 800; // fallback if CSS var not set
  const DEFAULT_SUMMARY_HEIGHT = 200; // fallback if CSS var not set

  const openImage = (url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="card"
      style={{
        '--card-height':    `${DEFAULT_CARD_HEIGHT}px`,
        '--summary-height': `${DEFAULT_SUMMARY_HEIGHT}px`
      }}
    >
      {/* ─── Header ─── */}
      <div className="card-header">
        <div className="card-title">Subject {subjectId}</div>
        <div className="card-meta">
          <div>Project: {project}</div>
          <div>Site: {site}</div>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <hr className="card-divider" />

      {/* ─── Summary Plot (fixed height) ─── */}
      <div className="summary-container">
        <button
          type="button"
          className="summary-button"
          onClick={() => openImage(summaryImageUrl)}
        >
          <img
            src={summaryImageUrl}
            alt={`Summary plot for ${subjectId}`}
            className="summary-image"
          />
        </button>
      </div>

      {/* ─── Daily Plot (flex‐grows to fill remaining space) ─── */}
      {/* ─── New version ─── */}
      <div className="daily-wrapper">
        <div className="daily-container">
          <button
            type="button"
            className="daily-button"
            onClick={() => openImage(dailyImageUrl)}
          >
            <img
              src={dailyImageUrl}
              alt={`Daily plot for ${subjectId}`}
              className="daily-image"
            />
          </button>
        </div>
        <div className="daily-fade" />
      </div>
    </div>
  );
};

export default ResultCard;
