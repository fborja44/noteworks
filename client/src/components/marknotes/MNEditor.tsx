/* Marknote Editor Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
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

const EditorMain = styled.div`
  height: 100%;
`;

const EditorContent = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 30px);
  outline: none;

  /* Editor Scrollbars */
  & *::-webkit-scrollbar {
    width: 8px;
    height: 100%;
  }

  & *::-webkit-scrollbar-thumb {
    background: var(--color-grey-dark) !important;
  }
`;

const EditorContainer = styled.section`
  background: white;
  height: 100%;
  flex: 1;
`;

const PreviewContainer = styled.section`
  background: white;
  height: 100%;
  flex: 1;
  overflow: auto;
`;

const EditorBody = css`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }

  .CodeMirror {
    height: 100%;
    font-size: 14px;
    padding-bottom: 10px;
    padding-right: 1em;
  }

  .CodeMirror.CodeMirror-wrap pre {
    word-break: break-word;
  }
`;

const PreviewBody = css`
  overflow: auto;
  padding: 0.3in 0.5in;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;

  h1,
  h2 {
    padding-bottom: 0.2em;
    border-bottom: 1px solid var(--color-grey);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.5em 0;
  }

  h1 {
    font-size: 24px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    margin: 0 0 0.5em 0;
  }

  code {
    display: block;
    background: var(--preview-code-block-background);
    padding: 0.2em 0.4em;
    border-radius: 8px;
    box-sizing: border-box;
  }

  blockquote {
    margin-left: 1em;
    padding-left: 1em;
    border-left: solid 2px var(--color-grey);
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

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
    <EditorMain>
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
      <EditorContent>
        <EditorContainer
          css={css`
            display: ${showEditor ? "default" : "none"};
          `}
        >
          <ControlledEditor
            css={EditorBody}
            value={currentNote.body}
            onBeforeChange={handleChangeEditorBody}
            options={{
              lineWrapping: true,
              mode: "markdown",
              lineNumbers: true,
            }}
          />
        </EditorContainer>
        {showEditor && showPreview && (
          <section
            css={css`
              width: 20px;
              background: #c4c4c4;
            `}
          />
        )}
        <PreviewContainer
          css={css`
            display: ${showPreview ? "default" : "none"};
          `}
        >
          <ReactMarkdown css={PreviewBody}>{currentNote.body}</ReactMarkdown>
        </PreviewContainer>
      </EditorContent>
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
    </EditorMain>
  );
};

export default MNEditor;
