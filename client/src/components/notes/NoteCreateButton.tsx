// React imports
import React from "react";

import { useHistory } from "react-router-dom";

import styled from "@emotion/styled";

// Redux imports
import { useDispatch } from "react-redux";
import { handleCreateQuicknote } from "../../utils/quicknotes";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";
import { handleCreateMarknote } from "../../utils/marknotes";

// Image and icon imports
import PlusIcon from "../icons/PlusIcon";
import { handleUpdateNoteGroups } from "../../utils/groups";

const CreateButtonContainer = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main.backgroundSecondary};
  color: ${(props) => props.theme.title.textSecondary};
  border: 1px solid ${(props) => props.theme.note.borderColor};
  border-radius: 5px;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    border-color: ${COLOR.blue.primary};
    background-color: ${(props) => props.theme.main.borderColor};
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 70px;

  svg {
    width: 35px;
    height: 35px;
  }
`;

interface NoteCreateButtonProps {
  noteType: "quicknote" | "marknote";
  group?: Group;
}

const NoteCreateButton = ({ noteType, group }: NoteCreateButtonProps) => {
  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  /**
   * Creates a new note of noteType.
   * If group is passed as a prop, adds that new note to the group.
   */
  const handleCreateNote = async () => {
    let newNote: Quicknote | Marknote;
    if (noteType === "quicknote") {
      newNote = await handleCreateQuicknote(dispatch);
    } else {
      newNote = await handleCreateMarknote(dispatch, history);
    }
    if (group) {
      await handleUpdateNoteGroups(dispatch, newNote, group._id);
    }
  };

  return (
    <CreateButtonContainer onClick={() => handleCreateNote()}>
      <ButtonContent>
        <PlusIcon />
        <span>Add New Note</span>
      </ButtonContent>
    </CreateButtonContainer>
  );
};

export default NoteCreateButton;
