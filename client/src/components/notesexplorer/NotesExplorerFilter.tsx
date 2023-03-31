/* Notes Explorer Filter Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Image and icon imports
import FilterIcon from "../icons/FilterIcon";

const NotesExplorerFilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0.5em;
  position: relative;

  .filter-icon {
    position: absolute;
    height: 12px;
    width: 12px;
    left: 12px;
  }
`;

const FilterInput = styled.input`
  width: 150px;
  height: 22px;
  margin-left: 0.3rem;
  padding: 0.2em 0.5em 0.2em 2.4em;
  font-size: 10px;
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

interface NotesExplorerFilterProps {
  handleFilterNote: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * NotesExplorerFilter component
 * TODO: Add delay before filter term is passed down
 */
const NotesExplorerFilter: React.FC<NotesExplorerFilterProps> = ({
  handleFilterNote,
}) => {
  return (
    <NotesExplorerFilterContainer>
      <FilterIcon className="filter-icon" />
      <FilterInput
        onChange={(event) => handleFilterNote(event.target.value)}
        placeholder="Filter Marknotes..."
      />
    </NotesExplorerFilterContainer>
  );
};

export default NotesExplorerFilter;
