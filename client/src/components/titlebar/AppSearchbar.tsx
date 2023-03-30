/* AppSearchbar Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Image and icon imports
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";

const AppSearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  height: 32px;
  position: relative;

  .app-search-icon {
    position: absolute;
    height: 16px;
    width: 16px;
    left: 16px;
  }
`;

const SearchInput = styled.input`
  width: 240px;
  height: 100%;
  margin-left: 0.3rem;
  padding: 0.2em 0.5em 0.2em 3.25em;
  font-size: 12px;
  background-color: ${(props) => props.theme.header.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.title.borderColor};
  border-radius: 5px 0px 0px 5px;
  color: ${(props) => props.theme.header.textSecondary};

  &::placeholder {
    color: ${(props) => props.theme.header.textSecondary};
  }

  &:focus {
    outline: none;
  }
`;

const AppSearchButton = styled.button`
  height: 100%;
  border: none;
  background-color: ${(props) => props.theme.title.borderColor};
  color: inherit;
  border-radius: 0px 5px 5px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    height: 12px;
    width: 12px;
  }
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.title.borderHoverColor}
  }
`;

interface AppSearchbarProps {}

/**
 * App Searchbar component
 */
const AppSearchbar: React.FC<AppSearchbarProps> = ({}) => {
  return (
    <AppSearchbarContainer>
      <MagnifyingGlassIcon className="app-search-icon" />
      <SearchInput onChange={() => {}} placeholder="Type to search for notes..." />
      <AppSearchButton>
        <ChevronRightIcon />
      </AppSearchButton>
    </AppSearchbarContainer>
  );
};

export default AppSearchbar;
