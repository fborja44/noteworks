/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Component imports
import PageHeader from "../pageheader/PageHeader";

export interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <React.Fragment>
      <PageHeader title="Settings" />
      <div className="main-content-wrapper">
        <div className="empty">
          <p>Settings are currently unavailable.</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
