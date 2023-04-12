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
import { handleCreateChecklist } from "../../utils/checklists";

const CreateButtonContainer = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.main.backgroundSecondary};
  color: ${(props) => props.theme.title.textSecondary};
  border: 1px solid ${(props) => props.theme.note.borderColor};
  border-radius: 5px;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    border-color: ${COLOR.blue.primary};
    background-color: ${(props) => props.theme.main.borderColor};
  }
`;

const ButtonContent = styled.div`
  display: flex;
  flex-direction: ${(props: { variant: "vertical" | "horizontal" }) =>
    props.variant === "vertical" ? "column" : "row"};
  justify-content: space-between;
  align-items: center;
  height: 55px;
  padding: 0 1.5em;
  text-transform: capitalize;

  svg {
    width: 24px;
    height: 24px;
  }
`;

interface NoteCreateButtonProps {
  noteType: "quicknote" | "marknote" | "checklist" | "group";
  group?: Group;
  variant: "vertical" | "horizontal";
}

const NoteCreateButton = ({
  noteType,
  group,
  variant,
}: NoteCreateButtonProps) => {
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
    } else if (noteType === "marknote") {
      newNote = await handleCreateMarknote(dispatch, history);
    } else if (noteType === "checklist") {
      newNote = await handleCreateChecklist(dispatch, history);
    } else {
      return;
    }
    if (group) {
      await handleUpdateNoteGroups(dispatch, newNote, group._id);
    }
  };

  return (
    <CreateButtonContainer onClick={() => handleCreateNote()}>
      <ButtonContent variant={variant}>
        <PlusIcon />
        <span>Add New {noteType}</span>
      </ButtonContent>
    </CreateButtonContainer>
  );
};

NoteCreateButton.defaultProps = {
  variant: "vertical",
};

export default NoteCreateButton;
