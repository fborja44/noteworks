import React from "react";

// Component imports
import Searchbar from "./quicknotes/Searchbar";

// Image and icon imports
import { IoSettingsSharp } from "react-icons/io5";
import { BiWindow } from "react-icons/bi";
import { FaRegWindowMinimize } from "react-icons/fa";
import { TiPower } from "react-icons/ti";

const Header = ({ handleSearchNote }) => {
  return (
    <header>
      <div id="header-left">
        <div id="app-title">Denote!</div>
        <Searchbar handleSearchNote={handleSearchNote} />
      </div>
      <div id="title-bar-buttons">
        <ul>
          <li>
            <IoSettingsSharp id="settings-icon" />
          </li>
          <li>
            <FaRegWindowMinimize id="minimize-icon" />
          </li>
          <li>
            <BiWindow id="window-icon" />
          </li>
          <li id="close-app-button">
            <TiPower id="power-icon" />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
