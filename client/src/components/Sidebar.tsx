// React imports
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Image and icon imports
import { BiNote, BiNotepad } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { TiHomeOutline } from "react-icons/ti";

export interface SidebarProps {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ selectedTab, setSelectedTab }: SidebarProps) => {
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
    <section id="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={() => setSelectedTab("/")} title="Home">
              <div id="/" className="nav-button" />
              <TiHomeOutline className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link
              to="/quicknotes"
              onClick={() => setSelectedTab("/quicknotes")}
              title="Quicknotes"
            >
              <div id="/quicknotes" className="nav-button" />
              <BiNote className="nav-icon" />
            </Link>
          </li>
          <li>
            <Link
              to="/marknotes"
              onClick={() => setSelectedTab("/marknotes")}
              title="Marknotes"
            >
              <div id="/marknotes" className="nav-button" />
              <BiNotepad className="nav-icon" />
            </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <Link
              to="/settings"
              onClick={() => setSelectedTab("/settings")}
              title="Settings"
            >
              <div id="/settings" className="nav-button" />
              <FiSettings className="nav-icon settings-icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Sidebar;
