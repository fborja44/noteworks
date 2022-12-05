/* 
Quicknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Group, Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import NoteHeader from "../notes/NoteHeader";
import QNFooter from "./QNFooter";
import NoteContent, { QuicknoteBody } from "../notes/NoteContent";
import GroupMenu from "../menus/GroupMenu";

// TODO: Fix borders on different monitors
const QuicknoteContainer = styled.div`
  background-color: ${(props) => props.theme.note.background};
  width: 230px;
  height: fit-content;
  justify-self: center;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif !important;
  border: 1px solid ${(props) => props.theme.note.borderColor};
  box-sizing: border-box;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  position: relative;

  textarea {
    border: none;
    resize: none;
    background-color: inherit;
    font-size: 13px;
    font-family: "Source Sans Pro", sans-serif !important;
    font-weight: 500;

    &::placeholder {
      color: ${(props) => props.theme.note.textSecondary};
    }
  }

  textarea::-webkit-scrollbar {
    width: 5px;
  }

  textarea::-webkit-scrollbar-thumb {
    background: ${COLOR.GREY_DARK};
  }

  textarea::-webkit-scrollbar-thumb:hover {
    cursor: default;
  }
`;

export interface QNComponentProps {
  // Props for children of QuicknotesContent
  groups: Group[];
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  currentNote: Quicknote;
  updateQuicknotesList: Function;
  handleDeleteQuicknote?: (id: string) => void;
  handleUpdateQuicknote: (noteId: string, updatedQuicknote: Quicknote) => void;
}

const QNComponent: React.FC<QNComponentProps> = ({
  groups,
  handleUpdateGroup,
  currentNote,
  updateQuicknotesList,
  handleDeleteQuicknote,
  handleUpdateQuicknote,
}) => {
  // Character limits
  const titleCharLimit = 30;
  const bodyCharLimit = 300;
  const bodyCharRemaining = bodyCharLimit - currentNote.body.length;

  /**
   * State for current note info
   */
  const [note, setNote] = useState(currentNote);

  /**
   * Function to handle changes in a note's field.
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the note's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: any,
    updateDate: Boolean = true
  ) => {
    // Check character limit
    if (
      (key === "title" && titleCharLimit - value.length < 0) ||
      (key === "body" && bodyCharLimit - value.length < 0)
    ) {
      return;
    } else {
      let updatedNote;
      if (updateDate) {
        updatedNote = {
          ...note,
          [key]: value,
          lastModified: Date.now(),
        }
      } else {
        updatedNote = {
          ...note,
          [key]: value,
        }
      }
      setNote(updatedNote)
      updateQuicknotesList(note._id, updatedNote)
    }
  };

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleEditField("color", color, false);
  };

  /**
   * Function to toggle whether a note is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = () => {
    handleEditField("favorited", note.favorited ? false : true, false);
  };

  // Menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
    setShowColorMenu((prev) => !prev); // Toggle off and on
  };

  // Quicknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  // Quicknote Group Menu state
  const [showGroupMenu, setShowGroupMenu] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleGroupMenu = () => {
    setShowGroupMenu((prev) => !prev);
  };

  useEffect(() => {
    const delayDBUpdate = setTimeout(() => {
      handleUpdateQuicknote(note._id, note);
    }, 3000);

    return () => clearTimeout(delayDBUpdate);
  }, [note, handleUpdateQuicknote]);

  return (
    <QuicknoteContainer>
      <NoteHeader
        currentNote={note}
        handleFavorite={handleFavorite}
        handleEditField={handleEditField}
        toggleGroupMenu={toggleGroupMenu}
        toggleColorMenu={toggleColorMenu}
        toggleConfirmDelete={toggleConfirmDelete}
      />
      <NoteContent
        css={css`
          height: 170px;
        `}
      >
        <QuicknoteBody
          placeholder="Write your note here..."
          value={note.body}
          onChange={(event) =>
            handleEditField("body", event.target.value, true)
          }
        />
        <QNFooter
          currentNote={note}
          remaining={bodyCharRemaining}
          limit={bodyCharLimit}
        />
      </NoteContent>
      <GroupMenu
        item={note}
        groups={groups}
        showGroupMenu={showGroupMenu}
        setShowGroupMenu={setShowGroupMenu}
        handleUpdateGroup={handleUpdateGroup}
      />
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={note}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDelete={handleDeleteQuicknote}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </QuicknoteContainer>
  );
};

export default QNComponent;
