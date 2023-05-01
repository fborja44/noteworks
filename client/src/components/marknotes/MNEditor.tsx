/* Marknote Editor Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

// Redux imports
import { useDispatch } from "react-redux";

// Common imports
import { Marknote } from "../../common/types";
import { COLOR, ColorId, NoteColor } from "../../common/color";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import PageHeader from "../pageheader/PageHeader";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import { Empty } from "../Section";

// Image and icon imports
import { VscOpenPreview, VscFileCode } from "react-icons/vsc";
import PencilSquareIcon from "../icons/PencilSquareIcon";
import TrashIcon from "../icons/TrashIcon";
import StarIcon from "../icons/StarIcon";
import ArrowUturnRightIcon from "../icons/ArrowUturnRightIcon";
import { BsMarkdownFill } from "react-icons/bs";

// Codemirror imports
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/markdown/markdown"; // import codemirror markdown

import { Controlled as CodeMirror } from "react-codemirror2"; // import text editor
import { handleUpdateMarknote } from "../../utils/marknotes";

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
      props.theme.id === "light"
        ? COLOR.dark_grey.primary
        : "#52525b"} !important;
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
  background: ${(props) => props.theme.editor.background};
  height: 100%;
  flex: 1;
  overflow: auto;
  z-index: 1;
`;

const EditorBody = styled(CodeMirror)`
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
    background: ${(props) => props.theme.editor.background};
    caret-color: ${COLOR.blue.primary};
  }

  .CodeMirror.CodeMirror-wrap pre {
    word-break: break-word;
  }

  .CodeMirror-gutters {
    ${(props) =>
      props.theme.id === "dark" &&
      `background: ${props.theme.main.background};`}
    border-right: 1px solid ${(props) => props.theme.main.borderColor};
  }
`;

const EditorBodyDark = css`
  .CodeMirror {
    color: white;

    .cm-comment {
      color: ${COLOR.grey.primary};
    }
  }

  .CodeMirror-linenumber {
    color: ${COLOR.grey.primary};
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
    border-bottom: 1px solid ${COLOR.grey.primary};
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
    background: inherit;
    padding: 0.6em 0.8em;
    border-radius: 8px;
    box-sizing: border-box;
    color: ${COLOR.blue.primary};
    line-height: 1.5em;
  }

  blockquote {
    margin-left: 1em;
    padding-left: 1em;
    border-left: solid 2px ${COLOR.grey.primary};
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const PreviewBodyDark = css`
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

const Divider = styled.section`
  width: 8px;
  background: ${(props) => props.theme.main.backgroundSecondary};
  border-right: 1px solid ${(props) => props.theme.main.borderColor};
  border-left: 1px solid ${(props) => props.theme.main.borderColor};
`;

/**
 * Editor component proptypes
 */
export interface MNEditorProps {
  activeNote: Marknote;
}

const MNEditor: React.FC<MNEditorProps> = ({ activeNote }) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // History hook
  const history = useHistory();

  // Dispatch hook
  const dispatch = useDispatch();

  /**
   * State for current marknote info
   */
  const [activeMarknote, setActiveMarknote] = useState(activeNote);

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  // Marknote Saved State
  const [saved, setSaved] = useState(true);

  /**
   * Function to handle a change in the marknote's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    handleEditField("color", color, false);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
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
    value: string | Boolean | NoteColor,
    updateDate: Boolean = true
  ) => {
    let updatedNote;
    if (updateDate) {
      updatedNote = {
        ...activeMarknote,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedNote = {
        ...activeMarknote,
        [key]: value,
      };
    }
    setActiveMarknote(updatedNote);
  };

  const handleChangeEditorBody = (value: string) => {
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
    if (!currentUser || currentUser.uid !== activeMarknote.author_id) return;
    const delayDBUpdate = setTimeout(() => {
      handleUpdateMarknote(dispatch, activeMarknote, currentUser);
      setSaved(true);
    }, 2000);

    return () => {
      setSaved(false);
      clearTimeout(delayDBUpdate);
    };
  }, [activeMarknote]);

  return (
    <EditorMain>
      <PageHeader
        item={activeMarknote}
        handleEditField={handleEditField}
        icon={<BsMarkdownFill className="markdown" />}
        saved={saved}
      >
        <PageHeaderButton
          id="toggle-code-button"
          title="Toggle Code Editor"
          onClick={() => setShowEditor((prev) => !prev)}
          selected={showEditor}
        >
          <VscFileCode />
        </PageHeaderButton>
        <PageHeaderButton
          id="toggle-preview-button"
          title="Toggle Preview"
          onClick={() => setShowPreview((prev) => !prev)}
          selected={showPreview}
        >
          <VscOpenPreview
            css={css`
              position: relative;
              top: 1px;
            `}
          />
        </PageHeaderButton>
        <PageHeaderButton
          id="edit-color-button"
          title="Options"
          onClick={toggleColorMenu}
        >
          <PencilSquareIcon />
        </PageHeaderButton>
        <PageHeaderButton
          id="delete-marknote-button"
          title="Delete Note"
          onClick={toggleConfirmDelete}
        >
          <TrashIcon />
        </PageHeaderButton>
        <PageHeaderButton
          id="favorite-marknote-button"
          title="Favorite"
          onClick={() => {
            const updatedMarknote = {
              ...activeMarknote,
              favorited: !activeMarknote.favorited,
            };
            setActiveMarknote(activeMarknote);
            dispatch(updatedMarknote);
          }}
        >
          {activeMarknote.favorited === false ? (
            <StarIcon />
          ) : (
            <StarIcon filled />
          )}
        </PageHeaderButton>
        <PageHeaderButton
          id="close-button"
          onClick={() => history.goBack()}
          title="Close Note"
        >
          <ArrowUturnRightIcon />
        </PageHeaderButton>
      </PageHeader>
      {!showEditor && !showPreview ? (
        <div className="main-content-wrapper">
          <Empty>
            <p>
              To open the editor, click the <VscFileCode /> button.
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
          <EditorBody
            css={[appTheme.id === "light" ? null : EditorBodyDark]}
            value={activeMarknote.body}
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
        {showEditor && showPreview && <Divider />}
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
            {activeMarknote.body}
          </ReactMarkdown>
        </PreviewContainer>
      </EditorContent>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={activeMarknote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </EditorMain>
  );
};

export default MNEditor;
