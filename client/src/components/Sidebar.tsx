// React imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Image and icon imports
import { BiNote, BiNotepad } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export interface SidebarProps {}

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("Quicknotes");

  const tabs = ["Quicknotes", "Marknotes", "Settings"];

  useEffect(() => {
    let selected = document.getElementById(selectedTab);
    if (selected !== null) selected.classList.add("selected");
    for (const tab of tabs.filter((tab) => tab !== selectedTab)) {
      let temp = document.getElementById(tab);
      if (temp !== null) temp.classList.remove("selected");
    }
  }, [selectedTab]);

  return (
    <section id="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/quicknotes" onClick={() => setSelectedTab("Quicknotes")} title="Quicknotes">
              <div id="Quicknotes" className="nav-button" />
              <BiNote className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/marknotes" onClick={() => setSelectedTab("Marknotes")} title="Marknotes">
              <div id="Marknotes" className="nav-button" />
              <BiNotepad className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setSelectedTab("Settings")} title="Settings">
              <div id="Settings" className="nav-button" />
              <FiSettings className="nav-icon settings-icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
