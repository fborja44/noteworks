/* Searchbar Button Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";
import { Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

const ButtonItem = styled.li`
  width: 100%;
  height: 45px;
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    width: 45px;
    height: 45px;
    position: absolute;
  }

  &:hover {
    background-color: var(--sidebar-bg-color-hover);
    transition: background-color 0.2s ease-out 0s;
  }

  &:hover .nav-button {
    cursor: pointer;
    border-left: solid 2px white;
    transition: all 0.2s ease 0s;
  }
`;

const NavButton = styled.div`
  width: 45px;
  height: 45px;
  position: absolute;
  border-left: solid 2px var(--sidebar-bg-color);
`;

export interface SidebarButtonProps {
  title: string;
  route: string;
  setSelectedTab: (value: React.SetStateAction<string>) => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  title,
  route,
  children,
  setSelectedTab,
}) => {
  return (
    <ButtonItem>
      <Link to={route} onClick={() => setSelectedTab(route)} title={title}>
        <NavButton id={route} className="nav-button" />
        {children}
      </Link>
    </ButtonItem>
  );
};

export default SidebarButton;
