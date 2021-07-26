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
import { COLOR } from "../../common/color";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

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

/**
 * Dynamic Element Styles
 * Should declare outside of function component, but need to declare here for dynamic styles
 * Issue: input is rerendered each time input is given, losing focus
 * Logic from this thread: https://github.com/emotion-js/emotion/issues/1797
 */
const SubheaderStyles = ({ color }: { color: string }) =>
  css`
    background: ${color};
  `;
const Subheader = styled.section`
  ${SubheaderStyles}
`;

const TitleInputStyles = ({ color }: { color: string }) =>
  css`
    background: ${color};
  `;
const TitleInput = styled.input`
  ${TitleInputStyles}
`;

const SubheaderButtonStyles = ({
  color,
  color2,
}: {
  color: string;
  color2: string;
}) =>
  css`
    background: ${color} !important;
    &:hover {
      background: ${color2} !important;
    }
  `;
const SubheaderButton = styled.button`
  ${SubheaderButtonStyles}
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

const MNEditor = ({
  currentNote,
  handleDeleteMarknote,
  handleUpdateMarknote,
  setRedirect,
}: MNEditorProps) => {
  // Logic to determine colors
  /**
   * TODO: Change subheader text colors for Lemon and Lime
   */
  let color = currentNote.color;
  let color_light;
  switch (color) {
    case COLOR.RED:
      color_light = COLOR.RED_LIGHT;
      break;
    case COLOR.ORANGE:
      color_light = COLOR.ORANGE_LIGHT;
      break;
    case COLOR.YELLOW:
      color_light = COLOR.YELLOW_LIGHT;
      break;
    case COLOR.GREEN:
      color_light = COLOR.GREEN_LIGHT;
      break;
    case COLOR.BLUE:
      color_light = COLOR.BLUE_LIGHT;
      break;
    case COLOR.PURPLE:
      color_light = COLOR.PURPLE_LIGHT;
      break;
    case COLOR.PINK:
      color_light = COLOR.PINK_LIGHT;
      break;
    case COLOR.CYAN:
      color_light = COLOR.CYAN_LIGHT;
      break;
    case COLOR.LEMON:
      color_light = COLOR.LEMON_LIGHT;
      break;
    case COLOR.LIME:
      color_light = COLOR.LIME_LIGHT;
      break;
    case COLOR.GREY:
      color_light = COLOR.GREY_LIGHT;
      break;
    case COLOR.GREY_DARK:
      color_light = COLOR.GREY_DARK_LIGHT;
      break;
    default:
      color_light = COLOR.GREY_LIGHT;
      break;
  }

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
      <Subheader className="sub-header" color={color}>
        <TitleInput
          type="text"
          className="editor-title"
          placeholder="Enter a title..."
          value={currentNote.title}
          onChange={(event) => handleEditField("title", event.target.value)}
          color={color_light}
        />
        <div className="sub-header-buttons">
          <ul>
            <li>
              <SubheaderButton
                title="Toggle Preview"
                color={showEditor ? color_light : color}
                color2={color_light}
                onClick={() => setShowEditor((prev) => !prev)}
              >
                <AiOutlineCode />
              </SubheaderButton>
            </li>
            <li>
              <SubheaderButton
                title="Toggle Preview"
                color={showPreview ? color_light : color}
                color2={color_light}
                onClick={() => setShowPreview((prev) => !prev)}
              >
                <VscOpenPreview />
              </SubheaderButton>
            </li>
            <li>
              <SubheaderButton
                title="Options"
                color={color}
                color2={color_light}
                onClick={toggleColorMenu}
              >
                <RiEdit2Line />
              </SubheaderButton>
            </li>
            <li>
              <SubheaderButton
                title="Delete Note"
                color={color}
                color2={color_light}
                onClick={toggleConfirmDelete}
              >
                <MdDeleteForever />
              </SubheaderButton>
            </li>
            <li>
              <SubheaderButton
                title="Favorite"
                color={color}
                color2={color_light}
                onClick={() =>
                  handleEditField(
                    "favorited",
                    currentNote.favorited === true ? false : true
                  )
                }
              >
                {currentNote.favorited === false ? (
                  <TiStarOutline />
                ) : (
                  <TiStar />
                )}
              </SubheaderButton>
            </li>
            <li>
              <SubheaderButton
                title="Return to Notes"
                color={color}
                color2={color_light}
              >
                <Link to="/marknotes">
                  <IoReturnUpForward />
                </Link>
              </SubheaderButton>
            </li>
          </ul>
        </div>
      </Subheader>
      {!showEditor && !showPreview ? (
        <div className="main-content-wrapper">
          <div className="empty">
            <p>
              To open the editor, click the <AiOutlineCode /> button.
            </p>
            <p>
              To open the preview, click the <VscOpenPreview /> button.
            </p>
          </div>
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
      />
    </div>
  );
};

export default MNEditor;
