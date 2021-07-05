// React imports
import { React, useState } from "react";

// Image and icon imports
import { FaSearch } from "react-icons/fa";

const Searchbar = ({ handleSearchNote }) => {
    return (
        <div className="searchbar">
            <FaSearch className="search-icon" size="1.3em" />
            <input
                onChange={(event) => handleSearchNote(event.target.value)}
                text="text"
                placeholder="type to search..."
            />
        </div>
    );
};

export default Searchbar;