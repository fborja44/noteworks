/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
export interface SettingsContentProps {}

const SettingsContent = ({}: SettingsContentProps) => {
  return (
    <React.Fragment>
      <section className="sub-header">
        <h1>Settings</h1>
      </section>
      <div className="main-content-wrapper">
        <div>Settings</div>
      </div>
    </React.Fragment>
  );
};

export default SettingsContent;
