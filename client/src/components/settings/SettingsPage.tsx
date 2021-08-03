/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Common imports
import { AppTheme } from "../../common/theme";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";

export interface SettingsPageProps {
  setTheme: React.Dispatch<React.SetStateAction<AppTheme>>;
}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <React.Fragment>
      <PageHeader title="Settings" />
      <div className="main-content-wrapper">
        <Section name="Appearance">

        </Section>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
