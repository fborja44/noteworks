/* Sidebar Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Component imports
import PageHeaderButton from "../pageheader/PageHeaderButton";

// Image and icon imports
import SidebarButton from "./SidebarButton";
import BoltIcon from "../icons/BoltIcon";
import HomeIcon from "../icons/HomeIcon";
import SettingsIcon from "../icons/SettingsIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import { BsMarkdown } from "react-icons/bs";
import DocumentCheckIcon from "../icons/DocumentCheckIcon";

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
  width: ${(props: { open: boolean }) => (props.open ? "100px" : "50px")};
  min-width: ${(props: { open: boolean }) => (props.open ? "100px" : "50px")};
  color: ${(props) => props.theme.sidebar.textPrimary};
  z-index: 0;
  transition: width 0.1s;

  nav {
    height: calc(100vh - 110px);
    padding: 0 0.3em;
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
  justify-content: ${(props: { open: boolean }) =>
    props.open ? "space-between" : "center"};
  align-items: center;
  padding: ${(props: { open: boolean }) =>
    props.open ? "0 0.25em 0 1em" : "0 0.25em"};
  border-bottom: 1px solid ${(props) => props.theme.sidebar.borderColor};
  font-size: 13px;
  font-weight: 600;
  ${(props: { open: boolean }) => !props.open && "transform: scale(-1, 1);"}
`;

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
  const [open, setOpen] = useState(true);

  return (
    <SidebarContainer open={open}>
      <SidebarTitle open={open}>
        {open && <span>Menu</span>}
        <PageHeaderButton
          title="Toggle Menu"
          onClick={() => {
            setOpen(!open);
          }}
          width={open ? "28px" : "100%"}
        >
          <ChevronLeftIcon className="menu-button" />
        </PageHeaderButton>
      </SidebarTitle>
      <nav>
        <ul>
          <div>
            <SidebarButton
              full={open}
              title="Home"
              label="Dashboard"
              icon={<HomeIcon css={NavIcon} />}
              route="/"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <SidebarButton
              full={open}
              title="Quicknotes"
              label="Quicknotes"
              icon={<BoltIcon css={NavIcon} />}
              route="/quicknotes"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <SidebarButton
              full={open}
              title="Marknotes"
              label="Marknotes"
              icon={<BsMarkdown css={NavIcon} />}
              route="/marknotes"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <SidebarButton
              full={open}
              title="Checklists"
              label="Checklists"
              icon={<DocumentCheckIcon css={NavIcon} />}
              route="/checklists"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <SidebarButton
            full={open}
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
