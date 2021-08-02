/* Quicknote Footer Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

// Component imports
import NoteFooter, { NoteFooterSection } from "../notes/NoteFooter";

// Common imports
import { Marknote } from "../../common/types";

export interface QNFooterProps {
  currentNote: Marknote;
}

const QNFooter: React.FC<QNFooterProps> = ({ currentNote }) => {
  return (
    <NoteFooter currentNote={currentNote}>
      <NoteFooterSection>
        <small>Last Modified</small>
      </NoteFooterSection>
      <NoteFooterSection>
        <small>
          {new Date(currentNote.lastModified).toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
      </NoteFooterSection>
    </NoteFooter>
  );
};

export default QNFooter;
