/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
export interface SettingsPageProps {}

const SettingsPage = () => {
  return (
    <React.Fragment>
      <section className="sub-header">
        <h1>Settings</h1>
      </section>
      <div className="main-content-wrapper">
        <div className="empty">
          <p>Settings are currently unavailable.</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
