import React from "react";
import { BiNotepad } from "react-icons/bi";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <Link to="/">
                <div className="app-title">
                    <span className="app-logo-container">
                        <BiNotepad className="app-logo" />
                    </span>
                    <span className="app-name">Denote!</span>
                </div>
            </Link>
            <NavBar />
        </header>
    );
};

export default Header;
