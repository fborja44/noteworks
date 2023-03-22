/* Sidebar Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Image and icon imports
import SidebarButton from "./SidebarButton";
import PencilSquareIcon from "../icons/PencilSquareIcon";
import BoltIcon from "../icons/BoltIcon";
import HomeIcon from "../icons/HomeIcon";
import SettingsIcon from "../icons/SettingsIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import PageHeaderButton from "../pageheader/PageHeaderButton";

export interface SidebarProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const NavIcon = css`
  height: 18px;
  width: 18px;
`;

const SidebarContainer = styled.aside`
  background: ${(props) => props.theme.sidebar.background};
  border-right: 1px solid ${(props) => props.theme.sidebar.borderColor};
  height: calc(100vh - 75px);
  width: 100px;
  min-width: 100px;
  color: ${(props) => props.theme.sidebar.textPrimary};
  z-index: 0;

  nav {
    height: calc(100vh - 110px);
    padding: 0 0.25em;
  }

  nav ul {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    list-style: none;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }

  a,
  a:visited {
    color: ${(props) => props.theme.sidebar.textPrimary};
  }
`;

const SidebarTitle = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.25em 0 0.8em;
  border-bottom: 1px solid ${(props) => props.theme.sidebar.borderColor};
  font-size: 14px;
`;

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <SidebarContainer>
      <SidebarTitle>
        <span>Menu</span>
        <PageHeaderButton title="Toggle Menu" onClick={() => {}} width="fit-content">
          <ChevronLeftIcon className="menu-button" />
        </PageHeaderButton>
      </SidebarTitle>
      <nav>
        <ul>
          <div>
            <SidebarButton
              title="Home"
              label="Dashboard"
              icon={<HomeIcon css={NavIcon} />}
              route="/"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <SidebarButton
              title="Quicknotes"
              label="My Quicknotes"
              icon={<BoltIcon css={NavIcon} />}
              route="/quicknotes"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <SidebarButton
              title="Marknotes"
              label="My Marknotes"
              icon={<PencilSquareIcon css={NavIcon} />}
              route="/marknotes"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <SidebarButton
            title="Settings"
            label="App Settings"
            icon={<SettingsIcon css={NavIcon} />}
            route="/settings"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </ul>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
