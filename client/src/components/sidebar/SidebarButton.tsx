/* Searchbar Button Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";
import { Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { setSelectedTab } from "../../redux/actions";

// Common imports
import { COLOR } from "../../common/color";
import { AppTheme } from "../../common/theme";

const ButtonItem = styled.div`
  width: 100%;
  height: 55px;
  font-size: 11px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  margin: 0.35em 0;

  user-drag: none;

  span {
    margin-top: 0.25em;
    white-space: nowrap;
  }

  &:hover {
    background-color: ${(props: { theme?: AppTheme }) =>
      props.theme && props.theme.sidebar.hoverColor};
    color: ${(props: { theme?: AppTheme }) =>
      props.theme && props.theme.sidebar.textSecondary};
    // transition: background-color 0.1s ease-out 0s;
  }

  ${(props: { theme?: AppTheme; selected: boolean }) =>
    props.selected &&
    `background: ${
      props.theme && props.theme.sidebar.backgroundSecondary
    } !important; color: ${props.theme && props.theme.sidebar.textSecondary};`}
`;

const LinkStyles = css`
  text-decoration: none;
`;

const Indicator = styled.span`
  width: 3px;
  height: 100%;
  border-radius: 5px 0px 0px 5px;
  background: ${COLOR.blue.primary};
  position: absolute;
  bottom: 0;
  left: 0;
`;

export interface SidebarButtonProps {
  full: boolean;
  title: string;
  label: string;
  icon: React.ReactNode;
  route: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  full,
  title,
  label,
  icon,
  route,
}) => {
  // Dispatch hook
  const dispatch = useDispatch();

  // Selected Tab state
  const selectedTab = useSelector((state: any) => state.selectedTabState);

  const isSelected = selectedTab === route;

  if (full) {
    return (
      <li>
        <Link
          css={LinkStyles}
          to={route}
          onClick={() => dispatch(setSelectedTab(route))}
          title={title}
        >
          <ButtonItem selected={isSelected}>
            {isSelected && <Indicator />}
            {icon}
            <span>{label}</span>
          </ButtonItem>
        </Link>
      </li>
    );
  }
  return (
    <li>
      <Link
        css={LinkStyles}
        to={route}
        onClick={() => dispatch(setSelectedTab(route))}
        title={title}
      >
        <ButtonItem selected={isSelected}>
          {isSelected && <Indicator />}
          {icon}
        </ButtonItem>
      </Link>
    </li>
  );
};

export default SidebarButton;
