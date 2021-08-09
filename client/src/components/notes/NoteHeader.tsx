/* Note Header Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Marknote, Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import FavoriteButton from "./FavoriteButton";
import MenuButton from "./MenuButton";
import DeleteButton from "./DeleteButton";
import DropdownMenu from "../dropdown/DropdownMenu";

const NoteHeaderContainer = styled.div`
  width: 100%;
  height: 25px;
  color: ${(props) => props.theme.note.header.textPrimary};
  background: ${COLOR.GREY};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
  border-bottom: 1px solid #828282;
`;

const NoteTitle = styled.input`
  width: 100%;
  font-weight: 700;
  padding: 2px 0 0 0;
  border: none;
  background-color: inherit;
  font-family: "Source Sans Pro", sans-serif;
  color: ${(props) => props.theme.note.header.textPrimary};

  &::placeholder {
    color: ${(props) => props.theme.note.header.textPrimary};
  }
`;

export interface NoteHeaderProps {
  currentNote: Quicknote | Marknote;
  handleFavorite: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleEditField: (key: string, value: any, updateDate?: Boolean) => void;
  toggleColorMenu:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  toggleConfirmDelete:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

/**
 * TODO: Option to change from regular title display to edit title input
 */
const NoteHeader: React.FC<NoteHeaderProps> = ({
  currentNote,
  handleFavorite,
  handleEditField,
  toggleColorMenu,
  toggleConfirmDelete,
  children,
}) => {
  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  return (
    <NoteHeaderContainer style={{ backgroundColor: currentNote.color }}>
      <FavoriteButton
        favorited={currentNote.favorited}
        onClick={handleFavorite}
      />
      <NoteTitle
        value={currentNote.title}
        placeholder="Untitled Note"
        onChange={(event) => handleEditField("title", event.target.value)}
        onClick={(event) => handleClick(event)}
      />
      <MenuButton toggleColorMenu={toggleColorMenu} />
      <DeleteButton onClick={toggleConfirmDelete} />
    </NoteHeaderContainer>
  );
};

export default NoteHeader;
