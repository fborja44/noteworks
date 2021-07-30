/* Header and Titlebar Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Image and icon imports
import { BiWindow, BiWindows } from "react-icons/bi";
import { FaRegWindowMinimize } from "react-icons/fa";
import { TiPower } from "react-icons/ti";

// Import electron renderer
let ipc: any;
try {
  const { ipcRenderer } = window.require("electron");
  ipc = ipcRenderer;
} catch (e) {
  // Do nothing
}

// Icon Components for Maximize/Restore button
const Restore = () => {
  return <BiWindows className="window-icon" />;
};

const Maximize = () => {
  return <BiWindow className="window-icon" />;
};

const HeaderContainer = styled.header`
  background-color: var(--header-bg-color);
  color: var(--header-text-color-primary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);

  position: relative;

  height: 30px;
  z-index: 1000;
`;

const ButtonsContainer = styled.ul`
  list-style: none;
  margin: 0;
  height: 30px;
  color: var(--header-text-color-primary);
  padding: 0;

  li {
    float: left;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 50px;
    height: 100%;
  }

  li:hover {
    background-color: var(--header-bg-color-hover);
    cursor: pointer;
    transition: background-color 0.2s ease 0s;F
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const Draggable = styled.div`
  flex: 1;
  height: 100%;
  display: absolute;
  top: 0;
  left: 0;
  -webkit-app-region: drag;
`;

const Title = styled.div`
  font-family: "Oleo Script", sans-serif;
  padding: 0 0.75rem;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
  -webkit-app-region: drag;
  -webkit-user-select: none;

`

const Header = () => {
  // State to check if window is maximized
  const [windowMaximized, setWindowMaximized] = useState(false);
  const [windowIcon, setWindowIcon] = useState(<Maximize />);
  const window_button = document.getElementById("window-button");

  // Button handlers
  const handleOnClickClose = () => {
    ipc.send("closeApp");
  };

  const handleOnClickMinimize = () => {
    ipc.send("minimizeApp");
  };

  const handleOnClickMaximizeRestore = () => {
    ipc.send("maximizeRestoreApp");
    setWindowMaximized(windowMaximized ? false : true);
  };

  // Effect hook to switch between maximize icon and restore icon
  useEffect(() => {
    setWindowIcon(windowMaximized ? <Restore /> : <Maximize />);
    if (window_button !== null)
      window_button.title = windowMaximized ? "Restore Down" : "Maximize";
  }, [windowMaximized, window_button]);

  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>Denote!</Title>
      </TitleContainer>
      <Draggable />
      {ipc ? (
        <ButtonsContainer>
          <li onClick={handleOnClickMinimize} title="Minimize">
            <FaRegWindowMinimize
              css={css`
                position: relative;
                bottom: 4px;
                font-size: 15px;
              `}
              id="minimize-icon"
            />
          </li>
          <li id="window-button" onClick={handleOnClickMaximizeRestore}>
            {windowIcon}
          </li>
          <li
            css={css`
              &:hover {
                background-color: var(--color-red-dark) !important;
              }
            `}
            onClick={handleOnClickClose}
            id="close-app-button"
            title="Close"
          >
            <TiPower
              css={css`
                font-size: 22px;
              `}
              id="power-icon"
            />
          </li>
        </ButtonsContainer>
      ) : null}
    </HeaderContainer>
  );
};

export default Header;
