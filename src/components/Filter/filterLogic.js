// src/components/Filter/filterLogic.js

let parsedData = null;
let flatSubjects = [];

/**
 * Flattens the nested data.json structure into a list of subject records:
 * [
 *   {
 *     subjectId: string,
 *     project:   string,     // "int" or "obs"
 *     site:      string,     // e.g. "UI" or "NE"
 *     png_paths: string[]    // array of two image paths
 *   },
 *   …
 * ]
 */
function flattenSubjects(nested) {
  return Object.entries(nested).flatMap(([project, sites]) =>
    Object.entries(sites).flatMap(([site, subjects]) =>
      Object.entries(subjects).map(([subjectId, pngPaths]) => ({
        subjectId,
        project,
        site,
        png_paths: Array.isArray(pngPaths) ? pngPaths : []
      }))
    )
  );
}

/**
 * Call this once before using filterSubjects.
 */
export async function initFilterData() {
  const res         = await fetch('data/data.json');
  parsedData        = await res.json();
  flatSubjects      = flattenSubjects(parsedData);
}

/**
 * Filters the pre-loaded flatSubjects by site or study.
 *
 * @param {{site?: string, study?: string}} filters
 * @returns Array<{
 *   subjectId: string,
 *   project:   string,
 *   site:      string,
 *   png_paths: string[]
 * }>
 */
export function filterSubjects(filters) {
  if (!flatSubjects.length) {
    console.warn('filterSubjects called before initFilterData');
    return [];
  }

  return flatSubjects.filter(item => {
    // Determine study from subjectId
    const study = item.subjectId.startsWith('7') ? 'obs' : 'int';

    if (filters.site && filters.site !== item.site)         return false;
    if (filters.project && filters.project !== study)       return false;

    return true;
  });
}

/**
 * Returns all flattened subject records (if you need to show everything).
 */
export function getAllSubjects() {
  return flatSubjects;
}
