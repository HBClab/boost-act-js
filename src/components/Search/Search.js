// src/components/Search/Search.js
import React, { useEffect, useState } from 'react';
import { useNavigate }                   from 'react-router-dom';
import { initSearch, search }            from './searchLogic';
import './Search.css';

const Search = () => {
  const [query, setQuery]             = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const navigate = useNavigate();

  useEffect(() => {
    initSearch();
  }, []);

  // ── Instead of “goToResults(pngPaths)”, expect an array of subject‐records:
  const goToResults = (subjectRecordsArray) => {
    navigate('/results', { state: { results: subjectRecordsArray } });
  };

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    setActiveIndex(-1);

    if (!q.trim()) {
      setSuggestions([]);
      return;
    }

    // search(q) now returns an array of objects:
    //   [{ subjectId, project, site, png_paths }, …]
    const matches = search(q).slice(0, 5);
    setSuggestions(matches);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
    }
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        // user has highlighted a suggestion
        selectSuggestion(suggestions[activeIndex]);
      } else if (query.trim()) {
        // no highlight: try to find an exact match in suggestions
        const exactMatch = suggestions.find(s => s.subjectId === query.trim());
        if (exactMatch) {
          selectSuggestion(exactMatch);
        } else if (suggestions.length) {
          // just pick the first fuzzy match
          selectSuggestion(suggestions[0]);
        }
        reset();
      }
    }
  };

  const selectSuggestion = (subjectObj) => {
    // subjectObj is { subjectId, project, site, png_paths }
    goToResults([subjectObj]);  // pass down an array of 1 subject‐record
    reset();
  };

  const reset = () => {
    setQuery('');
    setSuggestions([]);
    setActiveIndex(-1);
  };

  return (
    <div className="search-container">
      <input
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Search by subject ID…"
        className="search-input"
      />
      <button
        className="search-button"
        onClick={() => {
          if (suggestions[0]) {
            selectSuggestion(suggestions[0]);
          }
        }}
      >
        🔍
      </button>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((s, idx) => (
            <li
              key={s.subjectId}                      /* use subjectId as the unique key */
              className={idx === activeIndex ? 'active' : ''}
              onMouseEnter={() => setActiveIndex(idx)}
              onClick={() => selectSuggestion(s)}
            >
              {`Subject ${s.subjectId} (${s.project}/${s.site})`}
            </li>
          ))}
          <li className="suggestions-footer">
            {suggestions.length} result{suggestions.length !== 1 && 's'}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Search;
