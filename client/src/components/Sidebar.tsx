// React imports
import React, { useState, useEffect } from "react";

// Image and icon imports
import { BiNote, BiNotepad } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export interface SidebarProps {}

const Sidebar = () => {
  return (
    <section id="sidebar">
      <nav>
        <ul>
          <li>
            <div className="nav-button" />
            <BiNote className="nav-icon" />
          </li>
          <li>
            <div className="nav-button" />
            <BiNotepad className="nav-icon" />
          </li>
          <li>
            <div className="nav-button" />
            <FiSettings className="nav-icon settings-icon" />
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
