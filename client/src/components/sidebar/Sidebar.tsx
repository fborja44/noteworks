/* Sidebar Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Image and icon imports
import { BiNote, BiNotepad } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { TiHomeOutline } from "react-icons/ti";
import SidebarButton from "./SidebarButton";

export interface SidebarProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const NavIcon = css`
  position: relative;
  right: 1px;
`;

const SidebarContainer = styled.aside`
  background: var(--sidebar-bg-color);
  height: calc(100vh - 50px);
  width: 45px;
  min-width: 45px;
  color: var(--header-text-color-primary);
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
  }

  a,
  a:visited {
    color: white;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
  return (
    <SidebarContainer>
      <nav>
        <ul>
          <SidebarButton
            title="Home"
            route="/"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          >
            <TiHomeOutline css={NavIcon} />
          </SidebarButton>
          <SidebarButton
            title="Quicknotes"
            route="/quicknotes"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          >
            <BiNote css={NavIcon} />
          </SidebarButton>
          <SidebarButton
            title="Marknotes"
            route="/marknotes"
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          >
            <BiNotepad css={NavIcon} />
          </SidebarButton>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <SidebarButton
              title="Settings"
              route="/settings"
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            >
              <FiSettings
                css={[
                  NavIcon,
                  css`
                    font-size: 23px;
                    position: relative;
                    right: 1px;
                  `,
                ]}
              />
            </SidebarButton>
          </li>
        </ul>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
