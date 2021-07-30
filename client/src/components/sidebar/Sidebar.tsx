/* Sidebar Component
------------------------------------------------------------------------------*/
// React imports
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Image and icon imports
import { BiNote, BiNotepad } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { TiHomeOutline } from "react-icons/ti";
import SidebarButton from "./SidebarButton";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

export interface SidebarProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

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

  a, a:visited {
    color: white;
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, setSelectedTab }) => {
  const tabs = ["/", "/quicknotes", "/marknotes", "/settings"];
  // const location = useLocation().pathname;

  useEffect(() => {
    let selected = document.getElementById(selectedTab);
    if (selected !== null) selected.classList.add("selected");
    for (const tab of tabs.filter((tab) => tab !== selectedTab)) {
      let temp = document.getElementById(tab);
      if (temp !== null) temp.classList.remove("selected");
    }
  });

  return (
    <SidebarContainer>
      <nav>
        <ul>
          <SidebarButton title="Home" route="/" setSelectedTab={setSelectedTab}>
            <TiHomeOutline className="nav-icon" />
          </SidebarButton>
          <SidebarButton
            title="Quicknotes"
            route="/quicknotes"
            setSelectedTab={setSelectedTab}
          >
            <BiNote className="nav-icon" />
          </SidebarButton>
          <SidebarButton
            title="Marknotes"
            route="/marknotes"
            setSelectedTab={setSelectedTab}
          >
            <BiNotepad className="nav-icon" />
          </SidebarButton>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <SidebarButton
              title="Settings"
              route="/settings"
              setSelectedTab={setSelectedTab}
            >
              <FiSettings className="nav-icon settings-icon" />
            </SidebarButton>
          </li>
        </ul>
      </nav>
    </SidebarContainer>
  );
};

export default Sidebar;
