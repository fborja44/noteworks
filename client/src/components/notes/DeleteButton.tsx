/* Delete Button Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

// Component imports
import NoteButton from "./NoteButton";

// Image and icon imports
import { TiDelete } from "react-icons/ti";

export interface DeleteButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <NoteButton title="Delete" onClick={(event) => onClick(event)}>
      <TiDelete size="1em" />
    </NoteButton>
  );
};

export default DeleteButton;
