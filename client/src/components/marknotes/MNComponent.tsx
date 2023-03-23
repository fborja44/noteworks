/* Marknote Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";
import { Link } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Group, Marknote } from "../../common/types";

// Component imports
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import NoteHeader from "../notes/NoteHeader";
import MNFooter from "./MNFooter";
import NoteContent, { MarknoteBody } from "../notes/NoteContent";
import GroupMenu from "../menus/GroupMenu";

const MarknoteContainer = styled.div`
  background-color: ${(props) => props.theme.note.background};
  margin: 0 10px 0 10px;
  width: 240px;
  height: 330px;
  justify-self: center;
  font-size: 13px;
  font-family: "Source Sans Pro", sans-serif !important;
  border: 1px solid ${(props) => props.theme.note.borderColor};
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  position: relative;

  &:hover {
    border: 1px solid #26a7fd;
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
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  setGroupPage?: Function;
  currentNote: Marknote;
  updateMarknotesList: Function;
  handleUpdateMarknote?: (
    noteId: string,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote?: (noteId: string) => void;
  handleEditField: (
    key: string,
    value: string | Boolean,
    updateDate?: Boolean
  ) => void;
  handleFavorite: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleEditColor: (color: string) => void;
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
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  history: any;
}

const MNComponent: React.FC<MNComponentProps> = ({
  groups,
  updateGroupsList,
  handleUpdateGroup,
  setGroupPage,
  currentNote,
  updateMarknotesList,
  handleUpdateMarknote,
  handleDeleteMarknote,
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
  setSelectedTab,
  history,
}) => {
  return (
    <MarknoteContainer className="mncontainer">
      <Link
        css={MarknoteLink}
        to={`/marknotes/${currentNote._id}`}
        onClick={() => {
          setSelectedTab("/marknotes");
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
      <NoteContent
        css={css`
          height: calc(100% - 25px);
        `}
      >
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
        <MNFooter currentNote={currentNote} />
      </NoteContent>
      <GroupMenu
        item={currentNote}
        updateMarknotesList={updateMarknotesList}
        groups={groups}
        updateGroupsList={updateGroupsList}
        setGroupPage={setGroupPage}
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
        item={currentNote}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDelete={handleDeleteMarknote}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </MarknoteContainer>
  );
};

export default MNComponent;
