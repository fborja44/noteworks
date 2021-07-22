/* Header and Titlebar Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

// Component imports

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

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
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
    <header>
      <div id="header-left">
        <div id="app-title">Denote!</div>
      </div>
      <div id="header-drag"></div>
      <div id="title-bar-buttons">
        <ul>
          <li onClick={handleOnClickMinimize} title="Minimize">
            <FaRegWindowMinimize id="minimize-icon" />
          </li>
          <li id="window-button" onClick={handleOnClickMaximizeRestore}>
            {windowIcon}
          </li>
          <li onClick={handleOnClickClose} id="close-app-button" title="Close">
            <TiPower id="power-icon" />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
