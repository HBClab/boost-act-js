import React from "react";

const ResultCard = ({ groupHtmlContent }) => {
  if (!groupHtmlContent) {
    return (
      <div className="card error">
        <div className="card-header">
          <div className="card-title">Error</div>
        </div>
        <div className="card-body">No HTML content provided</div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">Group Plot</div>
      </div>
      <hr className="card-divider" />
      <div className="group-wrapper">
        <div className="group-container">
          <iframe
            srcDoc={groupHtmlContent}
            title="group plot"
            className="group-iframe group-fade"
            style={{ width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
