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
import { COLOR } from "../../common/color";

const NoteFooterContainer = styled.div`
background: ${(props: { color: string, backgroundColor: string }) => props.backgroundColor};
  color: ${(props: { color: string }) => props.color};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 20px;
  padding: 0 0.5em;
`;

export const NoteFooterSection = styled.div`
  display: flex;
  align-items: center;
`;

export interface NoteFooterProps {
  currentNote: Quicknote | Marknote;
}

const NoteFooter: React.FC<NoteFooterProps> = ({ currentNote, children }) => {
  return (
    <NoteFooterContainer backgroundColor={COLOR[currentNote.color].footer} color={COLOR[currentNote.color].secondary}>
      {children}
    </NoteFooterContainer>
  );
};

export default NoteFooter;
