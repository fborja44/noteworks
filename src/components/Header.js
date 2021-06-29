import React from "react";
import { BiNotepad } from "react-icons/bi";
import NavBar from "./NavBar";

const Header = () => {
    return (
        <header>
            <div className="app-title">
                <span className="app-logo-container">
                    <BiNotepad className="app-logo" />
                </span>
                <span className="app-name">Denote!</span>
            </div>
            <NavBar />
        </header>
    );
};

export default Header;
