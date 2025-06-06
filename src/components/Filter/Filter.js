// src/components/Filter/Filter.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate }                   from 'react-router-dom';
import { initFilterData, filterSubjects } from './filterLogic';
import './Filter.css';

const SITE_OPTIONS    = ['NE', 'UI'];
const PROJECT_OPTIONS = ['obs', 'int'];

export default function Filter({ onClose }) {
  const initialFilters = { site: '', project: '' };
  const [filters, setFilters] = useState(initialFilters);
  const [ready, setReady]       = useState(false);
  const popupRef               = useRef(null);
  const navigate               = useNavigate();

  // 1) load & flatten JSON once
  useEffect(() => {
    initFilterData()
      .then(() => setReady(true))
      .catch(err => console.error('Filter init failed:', err));
  }, []);

  // 2) click‐outside to close
  useEffect(() => {
    const onClickOutside = e => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [onClose]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFilters(f => ({ ...f, [name]: value }));
  };

  const handleClear = () => {
    setFilters(initialFilters);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!ready) return;
    const results = filterSubjects(filters);
    navigate('/results', { state: { results } });
  };

  return (
    <div className="filter-popup">
      <div ref={popupRef} className="filter-content">
        <h3>Filter Subjects</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Site:
            <select name="site" value={filters.site} onChange={handleChange}>
              <option value="">All</option>
              {SITE_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>

          <label>
            Project:
            <select name="project" value={filters.project} onChange={handleChange}>
              <option value="">All</option>
              {PROJECT_OPTIONS.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <div className="filter-buttons">
            <button type="submit" disabled={!ready}>
              Apply
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={handleClear}
              disabled={JSON.stringify(filters) === JSON.stringify(initialFilters)}
            >
              Clear
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
