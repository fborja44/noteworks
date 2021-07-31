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

// Component imports
import FavoriteButton from "./FavoriteButton";
import MenuButton from "./MenuButton";
import DeleteButton from "./DeleteButton";

const NoteHeaderContainer = styled.div`
  width: 100%;
  height: 25px;
  color: var(--note-header-text-color);
  background: var(--color-grey);
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5em;
  border-top: 1px solid #828282;
  border-left: 1px solid #828282;
  border-right: 1px solid #828282;
`;

const NoteTitle = styled.input`
  width: 100%;
  font-weight: 700;
  padding: 2px 0 0 0;
  border: none;
  background-color: inherit;
  font-family: "Source Sans Pro", sans-serif;
  color: var(--note-header-text-color);

  &::placeholder {
    color: var(--note-header-text-color);
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
      />
      <MenuButton onClick={toggleColorMenu} />
      <DeleteButton onClick={toggleConfirmDelete} />
    </NoteHeaderContainer>
  );
};

export default NoteHeader;
