// React imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import { MarknoteProps } from "./Marknote";
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

// Image and icon imports
import { IoReturnUpForward } from "react-icons/io5";
import { TiStarOutline } from "react-icons/ti"; //TiStar
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

export interface EditorProps {
  currentNote: MarknoteProps;
  handleDeleteMarknote: (noteId: any) => void;
  handleUpdateMarknote: (
    currentMarknote: MarknoteProps,
    updatedMarknote: any
  ) => void;
  setRedirect?: any;
}

// Should declare outside of function component, but need to declare here for dynamic styles
// Issue: input is rerendered each time input is given, losing focus
// Logic from this thread: https://github.com/emotion-js/emotion/issues/1797
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
    backgrouund: ${color};
    &:hover {
      background: ${color2};
    }
  `;
const SubheaderButton = styled.li`
  ${SubheaderButtonStyles}
`;

const Editor = ({
  currentNote,
  handleDeleteMarknote,
  handleUpdateMarknote,
  setRedirect,
}: EditorProps) => {
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
  const handleEditColor = (color: any) => {
    if (handleUpdateMarknote) {
      handleUpdateMarknote(currentNote, {
        ...currentNote,
        color: color,
      });
    }
  };

  /**
   * Function to toggle the color menu
   * TODO: Change event type
   */
  const toggleColorMenu = (event: any) => {
    // Prevent parent link from redirecting
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  /**
   * Function to handle changes in a note's field
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleEditField = (key: string, value: string) => {
    handleUpdateMarknote(currentNote, {
      ...currentNote,
      [key]: value,
      lastModified: Date.now(),
    });
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
            <SubheaderButton
              title="Options"
              color={color}
              color2={color_light}
              onClick={toggleColorMenu}
            >
              <RiEdit2Line />
            </SubheaderButton>
            <SubheaderButton
              title="Delete Note"
              color={color}
              color2={color_light}
              onClick={toggleConfirmDelete}
            >
              <MdDeleteForever />
            </SubheaderButton>
            <SubheaderButton
              title="Favorite"
              color={color}
              color2={color_light}
            >
              <TiStarOutline />
            </SubheaderButton>
            <SubheaderButton
              title="Return to Notes"
              color={color}
              color2={color_light}
            >
              <Link to="/marknotes">
                <IoReturnUpForward />
              </Link>
            </SubheaderButton>
          </ul>
        </div>
      </Subheader>
      <div className="editor-content">
        <section className="editor-container">
          <textarea
            className="editor-body"
            placeholder="Write your note here!&#10;You can use markdown syntax to style your note."
            value={currentNote.body}
            onChange={(event) => handleEditField("body", event.target.value)}
          />
        </section>
        <section className="preview-container">
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

export default Editor;
