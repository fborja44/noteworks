/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import { Theme } from "@emotion/react";
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { AppTheme, darkTheme, lightTheme } from "../../common/theme";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import ToggleSwitch from "./ToggleSwitch";

// Image and icon imports
import SettingsIcon from "../icons/SettingsIcon";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

const Option = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: inherit;
`;

const OptionLabel = styled.div`
  color: ${(props) => props.theme.main.textPrimary};
  margin-right: 1em;
  font-weight: 600;
  font-size: 13px;
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .sun-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.625em;
  }

  .moon-icon {
    width: 17px;
    height: 17px;
    margin-left: 0.625em;
  }
`;

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
      <PageHeader title="Settings" icon={<SettingsIcon />} />
      <div className="main-content-wrapper">
        <Section name="Appearance">
          <Option>
            <OptionLabel>App Theme:</OptionLabel>
            <ThemeToggleContainer>
              <SunIcon className="sun-icon" />
              <ToggleSwitch
                isToggled={appTheme === lightTheme ? false : true}
                onToggle={() =>
                  setAppTheme((prev) =>
                    prev === lightTheme ? darkTheme : lightTheme
                  )
                }
              />
              <MoonIcon className="moon-icon" />
            </ThemeToggleContainer>
          </Option>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
