/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";
import { Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Quicknote, Marknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component Imports
import ModalMenu from "./ModalMenu";

const MenuContent = styled.div`
  text-align: center;
  margin: 1rem 1rem 0 1rem;

  p {
    margin: 0;
  }
`;

const DeleteButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 0 auto;
  width: 200px;
  background-color: ${COLOR.RED};
  color: white;
  border: solid 1px #666666;
  height: 28px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 13px;

  &:visited {
    color: white;
  }

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.RED_DARK};
    transition: background-color 0.1s ease 0s;
  }
`;

export interface ConfirmDeleteProps {
  currentNote: Marknote | Quicknote;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteNote?: (id: string) => void;
  toggleConfirmDelete: (event: any) => void;
  redirect?: Boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  currentNote,
  showMenuState,
  setShowMenuState,
  handleDeleteNote,
  toggleConfirmDelete,
  redirect,
}) => {
  // Check if note title is empty
  const title =
    currentNote.title.trim().length === 0 ? "Untitled Note" : currentNote.title;

  // Check note type to determine route
  const route = currentNote.type === "marknote" ? "marknotes" : "quicknotes";

  return (
    <ModalMenu
      heading={`Delete "${title}"?`}
      showMenuState={showMenuState}
      setShowMenuState={setShowMenuState}
    >
      <MenuContent>
        <p>This action cannot be reversed.</p>
        {redirect ? (
          <Link
            to={`/${route}`}
            css={DeleteButton}
            onClick={
              handleDeleteNote
                ? (event) => {
                    handleDeleteNote(currentNote.id);
                    toggleConfirmDelete(event);
                  }
                : undefined
            }
          >
            Confirm
          </Link>
        ) : (
          <button
            css={DeleteButton}
            onClick={
              handleDeleteNote
                ? (event) => {
                    handleDeleteNote(currentNote.id);
                    toggleConfirmDelete(event);
                  }
                : undefined
            }
          >
            Confirm
          </button>
        )}
      </MenuContent>
    </ModalMenu>
  );
};

export default ConfirmDelete;
