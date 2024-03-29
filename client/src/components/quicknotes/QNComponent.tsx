/* 
Quicknote Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

import styled from "@emotion/styled";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

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
import { addUnsavedNote, setUnsavedNotes } from "../../redux/actions";

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
  unsavedNotes: Quicknote[];
  setSaved: Function;
}

const QNComponent: React.FC<QNComponentProps> = ({
  setActiveGroup,
  currentNote,
  unsavedNotes,
  setSaved,
}) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // Character limits
  const titleCharLimit = 30;
  const bodyCharLimit = 300;
  const bodyCharRemaining = bodyCharLimit - currentNote.body.length;

  /**
   * State for current quicknote info
   */
  const [quicknoteState, setQuicknoteState] = useState(currentNote);

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
          ...quicknoteState,
          [key]: value,
          lastModified: Date.now(),
        };
      } else {
        updatedNote = {
          ...quicknoteState,
          [key]: value,
        };
      }
      setQuicknoteState(updatedNote);
      setSaved(false);
      // Update unsaved
      dispatch(addUnsavedNote(updatedNote));
    }
  };

  /**
   * Function to handle a change in the quicknote's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    if (!currentUser || currentUser.uid !== quicknoteState.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedQuicknote = {
      ...quicknoteState,
      color: color,
    };
    setQuicknoteState(updatedQuicknote);
    handleUpdateQuicknote(dispatch, updatedQuicknote, currentUser);
  };

  /**
   * Function to toggle whether a quicknote is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = () => {
    if (!currentUser || currentUser.uid !== quicknoteState.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedQuicknote = {
      ...quicknoteState,
      favorited: !quicknoteState.favorited,
    };
    setQuicknoteState(updatedQuicknote);
    handleUpdateQuicknote(dispatch, updatedQuicknote, currentUser);
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
    if (!currentUser || currentUser.uid !== quicknoteState.author_id) return;
    const delayDBUpdate = setTimeout(() => {
      // Update every note in the unsaved queue.
      handleUpdateQuicknotes(dispatch, unsavedNotes, currentUser);
      dispatch(setUnsavedNotes([])); // Reset unsaved notes
      setSaved(true);
    }, 5000);
    return () => {
      clearTimeout(delayDBUpdate);
    };
  }, [quicknoteState, unsavedNotes]);

  return (
    <QuicknoteContainer bodyColor={COLOR[quicknoteState.color].body}>
      <NoteHeader
        currentNote={quicknoteState}
        handleFavorite={handleFavorite}
        handleEditField={handleEditField}
        toggleGroupMenu={toggleGroupMenu}
        toggleColorMenu={toggleColorMenu}
        toggleConfirmDelete={toggleConfirmDelete}
      />
      <NoteContent spellCheck={false}>
        <QuicknoteBody
          placeholder="Write your quicknote here..."
          value={quicknoteState.body}
          onChange={(event) =>
            handleEditField("body", event.target.value, true)
          }
        />
      </NoteContent>
      <QNFooter
        currentNote={quicknoteState}
        remaining={bodyCharRemaining}
        limit={bodyCharLimit}
      />
      <GroupMenu
        note={quicknoteState}
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
        item={quicknoteState}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </QuicknoteContainer>
  );
};

export default QNComponent;
