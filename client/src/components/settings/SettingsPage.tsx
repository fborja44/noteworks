/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import { Theme } from "@emotion/react";
import React from "react";

// Common imports
import { AppTheme, darkTheme, lightTheme } from "../../common/theme";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import ToggleSwitch from "./ToggleSwitch";

export interface SettingsPageProps {
  appTheme: Theme;
  setAppTheme: React.Dispatch<React.SetStateAction<AppTheme>>;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  appTheme,
  setAppTheme,
}) => {
  return (
    <React.Fragment>
      <PageHeader title="Settings" />
      <div className="main-content-wrapper">
        <Section name="Appearance">
          <ToggleSwitch
            isToggled={appTheme === lightTheme ? false : true}
            onToggle={() =>
              setAppTheme((prev) =>
                prev === lightTheme ? darkTheme : lightTheme
              )
            }
          />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
