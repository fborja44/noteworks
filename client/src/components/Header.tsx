// React imports
import React, { useState, useEffect } from "react";

// Component imports
import Searchbar from "./quicknotes/Searchbar";

// Image and icon imports
import { BiWindow, BiWindows } from "react-icons/bi";
import { FaRegWindowMinimize } from "react-icons/fa";
import { TiPower } from "react-icons/ti";

// Import electron renderer
const { ipcRenderer } = window.require("electron");
const ipc = ipcRenderer;

// Icon Components for Maximize/Restore button
const Restore = () => {
  return <BiWindows className="window-icon" />;
};

const Maximize = () => {
  return <BiWindow className="window-icon" />;
};

const Header = ({
  handleSearchNote,
}: {
  handleSearchNote: React.Dispatch<React.SetStateAction<string>>;
}) => {
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
        <Searchbar handleSearchNote={handleSearchNote} />
      </div>
      <div id="header-drag"></div>
      <div id="title-bar-buttons">
        <ul>
          <li onClick={handleOnClickMinimize}>
            <FaRegWindowMinimize id="minimize-icon" />
          </li>
          <li id="window-button" onClick={handleOnClickMaximizeRestore}>
            {windowIcon}
          </li>
          <li onClick={handleOnClickClose} id="close-app-button">
            <TiPower id="power-icon" />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
