/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import { Theme } from "@emotion/react";
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { AppTheme, darkTheme, lightTheme } from "../../common/theme";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import ToggleSwitch from "./ToggleSwitch";

// Image and icon imports
import { FiMoon } from "react-icons/fi";
import { ImSun } from "react-icons/im";

const Option = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: inherit;
`;

const OptionLabel = styled.div`
  color: ${(props) => props.theme.main.textPrimary};
  margin-bottom: 0.4em;
  font-weight: 500;
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
            <OptionLabel>Switch Theme:</OptionLabel>
            <div
              css={css`
                display: flex;
                flex-direction: row;
                align-items: center;
              `}
            >
              <ImSun
                css={css`
                  margin-right: 0.7em;
                `}
              />
              <ToggleSwitch
                isToggled={appTheme === lightTheme ? false : true}
                onToggle={() =>
                  setAppTheme((prev) =>
                    prev === lightTheme ? darkTheme : lightTheme
                  )
                }
              />
              <FiMoon
                css={css`
                  margin-left: 0.7em;
                `}
              />
            </div>
          </Option>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
