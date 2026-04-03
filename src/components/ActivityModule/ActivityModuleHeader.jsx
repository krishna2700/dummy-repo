import React from 'react';
import './ActivityModuleHeader.css';

/**
 * ActivityModuleHeader
 *
 * Fix: Removed `overflow: hidden`, `white-space: nowrap`, and `text-overflow: ellipsis`
 * from the header container and title elements. These CSS properties were causing the
 * header text to be truncated even though there was sufficient vertical space below.
 */
const ActivityModuleHeader = ({ title, subtitle }) => {
  return (
    <div className="activity-module">
      <div className="activity-module-header">
        <span className="header-title">{title}</span>
        {subtitle && <span className="header-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
};

export default ActivityModuleHeader;
