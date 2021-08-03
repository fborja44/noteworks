/* Marknote Editor Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Marknote } from "../../common/types";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import { EditorHeader } from "../pageheader/PageHeader";
import PageHeaderButton from "../pageheader/PageHeaderButton";

// Image and icon imports
import { IoReturnUpForward } from "react-icons/io5";
import { TiStarOutline, TiStar } from "react-icons/ti";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { AiOutlineCode } from "react-icons/ai";

// Codemirror imports
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/markdown/markdown"; // import codemirror markdown

import { Controlled as ControlledEditor } from "react-codemirror2"; // import text editor

const Empty = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: italic;
  text-align: center;

  p {
    margin: 0.5rem;
  }

  svg {
    position: relative;
    top: 3px;
    margin: 0 0.2em;
  }
`;

/**
 * Editor component proptypes
 */
export interface MNEditorProps {
  currentNote: Marknote;
  handleDeleteMarknote: (noteId: string) => void;
  handleUpdateMarknote: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  setRedirect: React.Dispatch<React.SetStateAction<JSX.Element>>;
}

const MNEditor: React.FC<MNEditorProps> = ({
  currentNote,
  handleDeleteMarknote,
  handleUpdateMarknote,
  setRedirect,
}) => {
  // Menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    if (handleUpdateMarknote) {
      handleUpdateMarknote(currentNote, {
        ...currentNote,
        color: color,
      });
    }
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Prevent parent link from redirecting
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Quicknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  // Reset redirect when editor mounts
  useEffect(() => {
    setRedirect(<></>);
  }, [setRedirect]);

  /**
   * Function to handle changes in a note's field
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleEditField = (key: string, value: string | Boolean) => {
    handleUpdateMarknote(currentNote, {
      ...currentNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const handleChangeEditorBody = (
    editor: string,
    data: string,
    value: string
  ) => {
    handleEditField("body", value);
  };

  // States for Editor and Preview
  const [showEditor, setShowEditor] = useState(true);
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="editor-main">
      <EditorHeader currentNote={currentNote} handleEditField={handleEditField}>
        <PageHeaderButton
          title="Toggle Preview"
          onClick={() => setShowEditor((prev) => !prev)}
        >
          <AiOutlineCode />
        </PageHeaderButton>
        <PageHeaderButton
          title="Toggle Preview"
          onClick={() => setShowPreview((prev) => !prev)}
        >
          <VscOpenPreview />
        </PageHeaderButton>
        <PageHeaderButton title="Options" onClick={toggleColorMenu}>
          <RiEdit2Line />
        </PageHeaderButton>
        <PageHeaderButton title="Delete Note" onClick={toggleConfirmDelete}>
          <MdDeleteForever />
        </PageHeaderButton>
        <PageHeaderButton
          title="Favorite"
          onClick={() =>
            handleEditField(
              "favorited",
              currentNote.favorited === true ? false : true
            )
          }
        >
          {currentNote.favorited === false ? <TiStarOutline /> : <TiStar />}
        </PageHeaderButton>
        <PageHeaderButton onClick={undefined} title="Return to Notes">
          <Link to="/marknotes">
            <IoReturnUpForward />
          </Link>
        </PageHeaderButton>
      </EditorHeader>
      {!showEditor && !showPreview ? (
        <div className="main-content-wrapper">
          <Empty>
            <p>
              To open the editor, click the <AiOutlineCode /> button.
            </p>
            <p>
              To open the preview, click the <VscOpenPreview /> button.
            </p>
          </Empty>
        </div>
      ) : null}
      <div className="editor-content">
        <section className={`editor-container ${showEditor ? "" : "hide"}`}>
          <ControlledEditor
            className="editor-body"
            value={currentNote.body}
            onBeforeChange={handleChangeEditorBody}
            options={{
              lineWrapping: true,
              mode: "markdown",
              lineNumbers: true,
            }}
          />
        </section>
        {showEditor && showPreview && <section className="editor-divider" />}
        <section className={`preview-container ${showPreview ? "" : "hide"}`}>
          <ReactMarkdown className="preview-body">
            {currentNote.body}
          </ReactMarkdown>
        </section>
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        currentNote={currentNote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDeleteNote={handleDeleteMarknote}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </div>
  );
};

export default MNEditor;
