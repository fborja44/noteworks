/* 
Quicknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux Imports
import { useDispatch } from "react-redux";
import {
  handleUpdateQuicknote,
  handleUpdateQuicknotes,
} from "../../utils/quicknotes";

// Common imports
import { Quicknote } from "../../common/types";
import { COLOR, ColorId } from "../../common/color";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import NoteHeader from "../notes/NoteHeader";
import QNFooter from "./QNFooter";
import NoteContent, { QuicknoteBody } from "../notes/NoteContent";
import GroupMenu from "../menus/GroupMenu";

const QuicknoteContainer = styled.div`
  background-color: ${(props: { bodyColor: string }) => props.bodyColor};
  width: 215px;
  height: 100%;
  justify-self: center;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif !important;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;

  textarea {
    border: none;
    resize: none;
    background-color: inherit;
    font-size: 12px;
    font-family: "Source Sans Pro", sans-serif !important;
    font-weight: 500;
    color: ${(props) => props.theme.note.textPrimary};

    &::placeholder {
      color: ${(props) => props.theme.note.textPrimary};
    }
  }

  textarea::-webkit-scrollbar {
    width: 5px;
  }

  textarea::-webkit-scrollbar-thumb {
    background: ${COLOR.dark_grey.primary};
  }

  textarea::-webkit-scrollbar-thumb:hover {
    cursor: default;
  }
`;

export interface QNComponentProps {
  setActiveGroup?: Function;
  currentNote: Quicknote;
  setSaved: Function;
  unsavedNotes: Quicknote[];
  setUnsavedNotes: Function;
}

const QNComponent: React.FC<QNComponentProps> = ({
  setActiveGroup,
  currentNote,
  setSaved,
  unsavedNotes,
  setUnsavedNotes,
}) => {
  // Dispatch hook
  const dispatch = useDispatch();

  // Character limits
  const titleCharLimit = 30;
  const bodyCharLimit = 300;
  const bodyCharRemaining = bodyCharLimit - currentNote.body.length;

  /**
   * State for current quicknote info
   */
  const [quicknote, setQuicknote] = useState(currentNote);

  /**
   * Function to handle changes in a quicknote's field.
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the quicknote's last modified date. [default=false]
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
      let updatedNote: Quicknote;
      if (updateDate) {
        updatedNote = {
          ...quicknote,
          [key]: value,
          lastModified: Date.now(),
        };
      } else {
        updatedNote = {
          ...quicknote,
          [key]: value,
        };
      }
      setQuicknote(updatedNote);
      // Add note to unsaved list if not already in; Otherwise, update the note.
      if (!unsavedNotes.filter((note) => note._id === updatedNote._id).length) {
        let newUnsavedNotes = unsavedNotes;
        newUnsavedNotes.push(updatedNote);
        setUnsavedNotes(newUnsavedNotes);
      } else {
        let newUnsavedNotes = unsavedNotes.map((note) => {
          return note._id === updatedNote._id ? updatedNote : note;
        });
        setUnsavedNotes(newUnsavedNotes);
      }
    }
  };

  /**
   * Function to handle a change in the quicknote's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    const updatedQuicknote = {
      ...quicknote,
      color: color,
    };
    setQuicknote(updatedQuicknote);
    handleUpdateQuicknote(dispatch, updatedQuicknote);
  };

  /**
   * Function to toggle whether a quicknote is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = () => {
    const updatedQuicknote = {
      ...quicknote,
      favorited: !quicknote.favorited,
    };
    setQuicknote(updatedQuicknote);
    handleUpdateQuicknote(dispatch, updatedQuicknote);
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
      // Update every note in the unsaved queue.
      handleUpdateQuicknotes(dispatch, unsavedNotes);
      setUnsavedNotes([]); // Reset unsaved notes
      setSaved(true);
    }, 2000);
    return () => {
      setSaved(false);
      clearTimeout(delayDBUpdate);
    };
  }, [quicknote]);

  return (
    <QuicknoteContainer bodyColor={COLOR[quicknote.color].body}>
      <NoteHeader
        currentNote={quicknote}
        handleFavorite={handleFavorite}
        handleEditField={handleEditField}
        toggleGroupMenu={toggleGroupMenu}
        toggleColorMenu={toggleColorMenu}
        toggleConfirmDelete={toggleConfirmDelete}
      />
      <NoteContent>
        <QuicknoteBody
          placeholder="Write your quicknote here..."
          value={quicknote.body}
          onChange={(event) =>
            handleEditField("body", event.target.value, true)
          }
        />
      </NoteContent>
      <QNFooter
        currentNote={quicknote}
        remaining={bodyCharRemaining}
        limit={bodyCharLimit}
      />
      <GroupMenu
        item={quicknote}
        setActiveGroup={setActiveGroup}
        showGroupMenu={showGroupMenu}
        setShowGroupMenu={setShowGroupMenu}
      />
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={quicknote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </QuicknoteContainer>
  );
};

export default QNComponent;
