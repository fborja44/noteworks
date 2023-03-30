/* Filterbar Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Image and icon imports
import FilterIcon from "../icons/FilterIcon";

const FilterbarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  position: relative;

  .filter-icon {
    position: absolute;
    height: 12px;
    width: 12px;
    left: 12px;
  }
`;

const FilterInput = styled.input`
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

interface FilterbarProps {
  handleFilterNote: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Filterbar component
 * TODO: Add delay before filter term is passed down
 */
const Filterbar: React.FC<FilterbarProps> = ({ handleFilterNote }) => {
  return (
    <FilterbarContainer>
      <FilterIcon className="filter-icon" />
      <FilterInput
        onChange={(event) => handleFilterNote(event.target.value)}
        placeholder="Type to filter notes..."
      />
    </FilterbarContainer>
  );
};

export default Filterbar;
