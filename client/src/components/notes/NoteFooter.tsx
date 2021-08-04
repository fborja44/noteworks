/* Note Footer Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Marknote, Quicknote } from "../../common/types";

const NoteFooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0.5rem 3px 0.5rem;
  border-top: 1px solid ${ (props) => props.theme.note.borderColor};
`;

export const NoteFooterSection = styled.div`
  display: flex;
  align-items: center;
`;

export interface NoteFooterProps {
  currentNote: Quicknote | Marknote;
}

const NoteFooter: React.FC<NoteFooterProps> = ({ currentNote, children }) => {
  return <NoteFooterContainer>{children}</NoteFooterContainer>;
};

export default NoteFooter;
