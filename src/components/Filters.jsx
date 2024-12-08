// Filters.jsx
import React from 'react';

/**
 * Filters Component
 * 
 * This component provides a UI for filtering content based on tags, status, demographic, and content rating.
 * Users can include or exclude specific tags, select the status of content, target specific demographics,
 * and choose a content rating.
 * 
 * @param {Object} props - The props object.
 * @param {string[]} props.includedTags - Tags to be included in the filter.
 * @param {string[]} props.excludedTags - Tags to be excluded from the filter.
 * @param {string[]} props.allTags - The complete list of tags available for filtering.
 * @param {Function} props.addTag - Function to add a tag to the included or excluded list.
 * @param {Function} props.removeTag - Function to remove a tag from the included or excluded list.
 * @param {string} props.status - The selected status filter (e.g., "ongoing", "completed").
 * @param {Function} props.setStatus - Function to update the selected status filter.
 * @param {string} props.demographic - The selected demographic filter (e.g., "shounen", "josei").
 * @param {Function} props.setDemographic - Function to update the selected demographic filter.
 * @param {string} props.contentRating - The selected content rating filter (e.g., "PG-13", "R").
 * @param {Function} props.setContentRating - Function to update the selected content rating filter.
 * 
 * @returns {JSX.Element} The Filters component.
 */
const Filters = ({
  includedTags, excludedTags, allTags, addTag, removeTag,
  status, setStatus, demographic, setDemographic, contentRating, setContentRating
}) => {
  return (
    <div className="filters">
      {/* Tags Section */}
      <div className="filters__section">
        <h3>Tags</h3>
        <div className="filters__tags">

          {/* Included Tags */}
          <div className="filters__tag-list">
            <h4>Included Tags</h4>
            {allTags.map(tag => (
              <label key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={includedTags.includes(tag)}
                  onChange={() => includedTags.includes(tag) ? removeTag(tag, true) : addTag(tag, true)}
                />
                {tag}
              </label>
            ))}
          </div>

          {/* Excluded Tags */}
          <div className="filters__tag-list">
            <h4>Excluded Tags</h4>
            {allTags.map(tag => (
              <label key={tag}>
                <input
                  type="checkbox"
                  value={tag}
                  checked={excludedTags.includes(tag)}
                  onChange={() => excludedTags.includes(tag) ? removeTag(tag, false) : addTag(tag, false)}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="filters__section">
        <h3>Status</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="hiatus">Hiatus</option>
        </select>
      </div>

      {/* Demographic Filter */}
      <div className="filters__section">
        <h3>Demographic</h3>
        <select value={demographic} onChange={(e) => setDemographic(e.target.value)}>
          <option value="">All</option>
          <option value="shounen">Shounen</option>
          <option value="shoujo">Shoujo</option>
          <option value="seinen">Seinen</option>
          <option value="josei">Josei</option>
        </select>
      </div>

      {/* Content Rating Filter */}
      <div className="filters__section">
        <h3>Content Rating</h3>
        <select value={contentRating} onChange={(e) => setContentRating(e.target.value)}>
          <option value="">All</option>
          <option value="safe">Safe</option>
          <option value="suggestive">Suggestive</option>
          <option value="erotica">Erotica</option>
          <option value="pornographic">Pornographic</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
