/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";
import { Link, useHistory } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux imports
import { setSelectedTab } from "../../redux/actions";
import { useDispatch } from "react-redux";

// Common imports
import { Marknote } from "../../common/types";
import { COLOR, ColorId } from "../../common/color";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import NoteHeader from "../notes/NoteHeader";
import MNFooter from "./MNFooter";
import NoteContent, { MarknoteBody } from "../notes/NoteContent";
import GroupMenu from "../menus/GroupMenu";

const MarknoteContainer = styled.div`
  background-color: ${(props: { bodyColor: string }) => props.bodyColor};
  margin: 0 10px 0 10px;
  width: 240px;
  height: 330px;
  justify-self: center;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif !important;
  border: 1px solid ${(props) => props.theme.note.borderColor};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    border: 1px solid ${COLOR.blue.primary};
  }
`;

const MarknoteLink = css`
  text-decoration: none;
  position: absolute;
  width: 240px;
  height: 330px;
  z-index: 1;
`;

export interface MNComponentProps {
  setActiveGroup?: Function;
  currentNote: Marknote;
  handleEditField: (
    key: string,
    value: string | Boolean,
    updateDate?: Boolean
  ) => void;
  handleFavorite: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleEditColor: (color: ColorId) => void;
  toggleConfirmDelete: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  toggleColorMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  toggleGroupMenu: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  showGroupMenu: boolean;
  setShowGroupMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showColorMenu: boolean;
  setShowColorMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmDelete: boolean;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const MNComponent: React.FC<MNComponentProps> = ({
  setActiveGroup,
  currentNote,
  handleEditField,
  handleFavorite,
  handleEditColor,
  toggleConfirmDelete,
  toggleColorMenu,
  toggleGroupMenu,
  showGroupMenu,
  setShowGroupMenu,
  showColorMenu,
  setShowColorMenu,
  showConfirmDelete,
  setShowConfirmDelete,
}) => {
  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  return (
    <MarknoteContainer
      className="mncontainer"
      bodyColor={COLOR[currentNote.color].body}
    >
      <Link
        css={MarknoteLink}
        to={`/marknotes/${currentNote._id}`}
        onClick={() => {
          dispatch(setSelectedTab("/marknotes"));
          history.push("/marknotes");
        }}
      />
      <NoteHeader
        currentNote={currentNote}
        handleFavorite={handleFavorite}
        handleEditField={handleEditField}
        toggleGroupMenu={toggleGroupMenu}
        toggleColorMenu={toggleColorMenu}
        toggleConfirmDelete={toggleConfirmDelete}
      />
      <NoteContent spellCheck={false}>
        <MarknoteBody
          css={css`
            height: calc(100% - 25px);
            overflow: hidden;
          `}
        >
          {currentNote.body.length > 0 ? (
            currentNote.body
          ) : (
            <span className="italic">This note is empty.</span>
          )}
        </MarknoteBody>
      </NoteContent>
      <MNFooter currentNote={currentNote} />
      <GroupMenu
        item={currentNote}
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
        item={currentNote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </MarknoteContainer>
  );
};

export default MNComponent;
