/* Searchbar Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Image and icon imports
import FilterIcon from "../icons/FilterIcon";

const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  position: relative;

  .search-icon {
    position: absolute;
    height: 12px;
    width: 12px;
    left: 12px;
  }
`;

const SearchInput = styled.input`
  width: 175px;
  height: 24px;
  margin-left: 0.3rem;
  padding: 0.2em 0.5em 0.2em 2.25em;
  font-size: 11px;
  background-color: ${(props) => props.theme.header.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.title.borderColor};
  border-radius: 5px;
  color: ${(props) => props.theme.header.textSecondary};

  &::placeholder {
    color: ${(props) => props.theme.header.textSecondary};
  }

  &:focus {
    outline: none;
  }
`;

interface SearchbarProps {
  handleSearchNote: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Searchbar component
 * TODO: Add delay before search term is passed down
 */
const Searchbar: React.FC<SearchbarProps> = ({ handleSearchNote }) => {
  return (
    <SearchbarContainer>
      <FilterIcon className="search-icon" />
      <SearchInput
        onChange={(event) => handleSearchNote(event.target.value)}
        placeholder="Type to filter notes..."
      />
    </SearchbarContainer>
  );
};

export default Searchbar;
