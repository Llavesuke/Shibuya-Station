// Filters.jsx
import React from 'react';

const Filters = ({
  includedTags, excludedTags, allTags, addTag, removeTag,
  status, setStatus, demographic, setDemographic, contentRating, setContentRating
}) => {
  return (
    <div className="filters">
      <div className="filters__section">
        <h3>Tags</h3>
        <div className="filters__tags">
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

      {/* Filtro de Status */}
      <div className="filters__section">
        <h3>Status</h3>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="hiatus">Hiatus</option>
        </select>
      </div>

      {/* Filtro Demográfico */}
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

      {/* Filtro de Content Rating */}
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
