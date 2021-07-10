// React imports
import React from "react";

// Component imports
import Searchbar from "./quicknotes/Searchbar";

// Image and icon imports
import { IoSettingsSharp } from "react-icons/io5";
import { BiWindow } from "react-icons/bi";
import { FaRegWindowMinimize } from "react-icons/fa";
import { TiPower } from "react-icons/ti";

// Import electron renderer
const { ipcRenderer } = window.require("electron");
const ipc = ipcRenderer;

// Button handlers
const handleOnClickClose = () => {
  ipc.send("closeApp");
};

const handleOnClickMinimize = () => {
  ipc.send("minimizeApp");
};

const handleOnClickMaximize = () => {
  ipc.send("maximizeApp");
};

const Header = ({ handleSearchNote }: {handleSearchNote: React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <header>
      <div id="header-left">
        <div id="app-title">Denote!</div>
        <Searchbar handleSearchNote={handleSearchNote} />
      </div>
      <div id="header-drag"></div>
      <div id="title-bar-buttons">
        <ul>
          <li>
            <IoSettingsSharp id="settings-icon" />
          </li>
          <li onClick={handleOnClickMinimize}>
            <FaRegWindowMinimize id="minimize-icon" />
          </li>
          <li onClick={handleOnClickMaximize}>
            <BiWindow id="window-icon" />
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
