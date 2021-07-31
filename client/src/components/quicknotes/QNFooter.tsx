/* Quicknote Footer Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Component imports
import NoteFooter, { NoteFooterSection } from "../notes/NoteFooter";

// Common imports
import { Quicknote } from "../../common/types";

export interface QNFooterrProps {
  currentNote: Quicknote;
  remaining: number;
  limit: number;
}

const QNFooterr: React.FC<QNFooterrProps> = ({
  currentNote,
  remaining,
  limit,
}) => {
  return (
    <NoteFooter currentNote={currentNote}>
      <NoteFooterSection>
        <small>
          {new Date(currentNote.lastModified).toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </small>
      </NoteFooterSection>
      <NoteFooterSection>
        <small>
          {remaining}/{limit}
        </small>
      </NoteFooterSection>
    </NoteFooter>
  );
};

export default QNFooterr;
