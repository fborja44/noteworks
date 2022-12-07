/* Marknote Editor Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Marknote } from "../../common/types";
import { COLOR } from "../../common/color";
// import { lightTheme } from "../../common/theme";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import { InputPageHeader } from "../pageheader/PageHeader";
import PageHeaderButton from "../pageheader/PageHeaderButton";

// Image and icon imports
import { IoReturnUpForward } from "react-icons/io5";
import { TiStarOutline, TiStar } from "react-icons/ti";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
import { AiOutlineCode } from "react-icons/ai";
import { Empty } from "../Section";

// Codemirror imports
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/markdown/markdown"; // import codemirror markdown

import { Controlled as CodeMirror } from "react-codemirror2"; // import text editor

const EditorMain = styled.div`
  height: 100%;
  width: 100%;
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
    background: ${(props) =>
      props.theme.id === "light" ? COLOR.GREY_DARK : "#52525b"} !important;
    border-radius: 2px;
  }
`;

const EditorContainer = styled.section`
  background: white;
  height: 100%;
  flex: 1;
  z-index: 1;
`;

const PreviewContainer = styled.section`
  background: white;
  height: 100%;
  flex: 1;
  overflow: auto;
  z-index: 1;
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

const EditorBodyDark = css`
  .CodeMirror {
    background: #1b1a20;
    color: white;

    .cm-comment {
      color: ${COLOR.GREY};
    }
  }

  .CodeMirror-linenumber {
    color: ${COLOR.GREY};
  }

  .CodeMirror-gutters {
    background: #1b1a20;
    border-right: 1px solid #34333b;
  }
`;

const PreviewBody = css`
  overflow: auto;
  padding: 0.3in 0.5in;
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  color: black;

  h1,
  h2 {
    padding-bottom: 0.2em;
    border-bottom: 1px solid ${COLOR.GREY};
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
    background: rgb(241, 241, 241);
    padding: 0.6em 0.8em;
    border-radius: 8px;
    box-sizing: border-box;
    color: ${COLOR.BLUE};
    line-height: 1.5em;
  }

  blockquote {
    margin-left: 1em;
    padding-left: 1em;
    border-left: solid 2px ${COLOR.GREY};
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const PreviewBodyDark = css`
  background: #1b1a20;
  color: white;
  code {
    background: #52525b;
    color: lightblue;
  }

  a {
    color: CornflowerBlue;
  }

  a:visited {
    color: violet;
  }
`;

/**
 * Editor component proptypes
 */
export interface MNEditorProps {
  currentNote: Marknote;
  updateMarknotesList: Function;
  handleDeleteMarknote: (noteId: string) => void;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
}

const MNEditor: React.FC<MNEditorProps> = ({
  currentNote,
  updateMarknotesList,
  handleDeleteMarknote,
  handleUpdateMarknote,
}) => {
  // History
  const history = useHistory();

  /**
   * State for current marknote info
   */
  const [marknote, setMarknote] = useState(currentNote);

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle a change in the marknote's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleEditField("color", color, false);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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

  /**
   * Function to handle changes in a marknote's field
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleEditField = (
    key: string,
    value: string | Boolean,
    updateDate: Boolean = true
  ) => {
    let updatedNote;
    if (updateDate) {
      updatedNote = {
        ...marknote,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedNote = {
        ...marknote,
        [key]: value,
      };
    }
    setMarknote(updatedNote);
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

  const appTheme = useTheme();

  /**
   * Effect hook to delay saving to the database.
   */
  useEffect(() => {
    const delayDBUpdate = setTimeout(() => {
      handleUpdateMarknote(marknote._id, marknote);
      updateMarknotesList(marknote._id, marknote);
    }, 1000);

    return () => clearTimeout(delayDBUpdate);
  }, [marknote]);

  return (
    <EditorMain>
      <InputPageHeader item={marknote} handleEditField={handleEditField}>
        <PageHeaderButton
          title="Toggle Preview"
          onClick={() => setShowEditor((prev) => !prev)}
          selected={showEditor}
        >
          <AiOutlineCode />
        </PageHeaderButton>
        <PageHeaderButton
          title="Toggle Preview"
          onClick={() => setShowPreview((prev) => !prev)}
          selected={showPreview}
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
          onClick={() => {
            const updatedMarknote = {
              ...marknote,
              favorited: !marknote.favorited,
            };
            setMarknote(marknote);
            handleUpdateMarknote(marknote._id, updatedMarknote);
            updateMarknotesList(marknote._id, updatedMarknote);
          }}
        >
          {marknote.favorited === false ? <TiStarOutline /> : <TiStar />}
        </PageHeaderButton>
        <PageHeaderButton
          onClick={() => history.goBack()}
          title="Return to Notes"
        >
          <IoReturnUpForward />
        </PageHeaderButton>
      </InputPageHeader>
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
      <EditorContent
        css={css`
          display: ${!showEditor && !showPreview ? "none" : "default"};
        `}
      >
        <EditorContainer
          css={css`
            display: ${showEditor ? "default" : "none"};
          `}
        >
          <CodeMirror
            css={[EditorBody, appTheme.id === "light" ? null : EditorBodyDark]}
            value={marknote.body}
            onBeforeChange={handleChangeEditorBody}
            options={{
              lineWrapping: true,
              mode: "markdown",
              theme: `${
                appTheme.id === "light" ? "default" : "material-darker"
              }`,
              lineNumbers: true,
            }}
          />
        </EditorContainer>
        {showEditor && showPreview && (
          <section
            css={css`
              width: 20px;
              background: ${appTheme.id === "light" ? "#c4c4c4" : "#34333b"};
            `}
          />
        )}
        <PreviewContainer
          css={css`
            display: ${showPreview ? "default" : "none"};
          `}
        >
          <ReactMarkdown
            css={[
              PreviewBody,
              appTheme.id === "light" ? null : PreviewBodyDark,
            ]}
          >
            {marknote.body}
          </ReactMarkdown>
        </PreviewContainer>
      </EditorContent>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={marknote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDelete={handleDeleteMarknote}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </EditorMain>
  );
};

export default MNEditor;
