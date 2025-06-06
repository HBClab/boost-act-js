// src/components/Search/searchLogic.js
import Fuse from 'fuse.js';

let parsedData = {};
let subjectFuse = null;

/**
 * Load & index the JSON.
 * - parsedData holds the raw object so we can do nested lookups.
 * - subjectFuse indexes only subject IDs (no tasks).
 */
export async function initSearch() {
  const res       = await fetch('data/data.json');
  parsedData      = await res.json();

  // Build a flat array of all subjects (with their project, site, and png paths):
  const subjectRecords = [];
  Object.entries(parsedData).forEach(([project, sites]) => {
    Object.entries(sites).forEach(([site, subjects]) => {
      Object.entries(subjects).forEach(([subjectId, png_paths]) => {
        subjectRecords.push({ subjectId, project, site, png_paths });
      });
    });
  });

  // Create a Fuse index over subjectId only:
  subjectFuse = new Fuse(subjectRecords, {
    keys:      ['subjectId'],
    threshold: 0.2,    // fairly strict—mostly exact matches
  });
}

/**
 * @param {string} query
 * @returns {Array<{
 *   type:       'subject',
 *   subjectId:  string,
 *   project:    string,
 *   site:       string,
 *   png_paths:  string[]
 * }>}
 *
 * Only searches for subject IDs (exact first, then fuzzy).  
 * No task‐level lookup at all.
 */
export function search(query) {
  if (!subjectFuse) return [];

  // 1) Try exact match on subjectId
  const exactResults = subjectFuse
    .search(query, { limit: 5, threshold: 0.3 })
    .map(r => r.item);

  if (exactResults.length) {
    return exactResults.map(item => ({
      type:       'subject',
      subjectId:  item.subjectId,
      project:    item.project,
      site:       item.site,
      png_paths:  item.png_paths
    }));
  }

  // 2) Fuzzy match on subjectId
  const fuzzyMatches = subjectFuse.search(query).map(r => r.item);
  return fuzzyMatches.map(item => ({
    type:       'subject',
    subjectId:  item.subjectId,
    project:    item.project,
    site:       item.site,
    png_paths:  item.png_paths
  }));
}

/**
 * Given a subjectId, return that subject's png_paths (or [] if not found).
 */
export function getPngsForSubject(subjectId) {
  if (!parsedData) return [];

  for (const [project, sites] of Object.entries(parsedData)) {
    for (const [site, subjects] of Object.entries(sites)) {
      if (subjects.hasOwnProperty(subjectId)) {
        return subjects[subjectId];
      }
    }
  }

  return [];
}
