// components/Group/Group.js
import { useParams, useNavigate } from "react-router-dom";
import Banner from '../../components/Banner/Banner';
import React from 'react';
import Button from '@mui/material/Button';
import { ReactComponent as IconSvg } from "../../assets/svg/back.svg";
import './Group.css';

const Group = () => {
  const { groupName } = useParams();
  const navigate = useNavigate();

  const groupUrlMap: Record<string,string> = {
    observational: "/data/group/avg_plot_all.html",
    "intervention-1": "/data/group/avg_plot_ses-1.html",
    "intervention-2": "/data/group/avg_plot_ses-2.html",
    "intervention-3": "/data/group/avg_plot_ses-3.html",
    "intervention-4": "/data/group/avg_plot_ses-4.html",
    "intervention-5": "/data/group/avg_plot_ses-5.html",
  };

  // look up the URL for this groupName
  const iframeSrc = groupUrlMap[groupName];

  return (
    <div className="container">
      <Banner />

      <div className="back-button-container">
        <Button onClick={() => navigate('/group')} className="back-button">
          <IconSvg alt="Back" className="back-button-icon" />
        </Button>
      </div>

      <div className="title-row">
        <div className="title">
          Group plot for {groupName}
        </div>
      </div>

      <div className="group-card">
        {iframeSrc
          ? (
            <iframe
              src={iframeSrc}
              title={`Group plot: ${groupName}`}
              className="group-iframe"
            />
          )
          : (
            <div className="error">
              No plot found for &quot;{groupName}&quot;
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Group;
