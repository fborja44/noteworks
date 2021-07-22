// React imports
import React from "react";
// Image and icon imports
import { FaSearch } from "react-icons/fa";

interface SearchbarProps {
  handleSearchNote: React.Dispatch<React.SetStateAction<string>>;
}

const Searchbar = ({ handleSearchNote }: SearchbarProps) => {
  return (
    <div className="searchbar">
      <FaSearch className="search-icon" size="1.3em" />
      <input
        onChange={(event) => handleSearchNote(event.target.value)}
        placeholder="type to search..."
      />
    </div>
  );
};

export default Searchbar;
