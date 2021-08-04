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

const Option = styled.div`
  display: flex;
  align-items: center;
  background-color: inherit;
`;

const OptionLabel = styled.div`
  color: ${(props) => props.theme.main.textPrimary};
  margin-right: 0.5em;
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
      <PageHeader title="Settings" />
      <div className="main-content-wrapper">
        <Section name="Appearance">
          <Option>
            <OptionLabel>Dark Mode</OptionLabel>
            <ToggleSwitch
              isToggled={appTheme === lightTheme ? false : true}
              onToggle={() =>
                setAppTheme((prev) =>
                  prev === lightTheme ? darkTheme : lightTheme
                )
              }
            />
          </Option>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
