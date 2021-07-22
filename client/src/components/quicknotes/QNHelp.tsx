/* Marknotes Help Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Component imports
import ModalMenu from "../menus/ModalMenu";

export interface QNHelpProps {
  showQNHelp: any;
  setShowQNHelp: any;
}

const QNHelp = ({ showQNHelp, setShowQNHelp }: QNHelpProps) => {
  return (
    <ModalMenu
      heading="Quicknotes Help"
      showMenuState={showQNHelp}
      setShowMenuState={setShowQNHelp}
    >
      <p>
        Quicknotes are small and quick notes similar to sticky notes for jotting
        down quick thoughts, notes, or ideas.
      </p>
      <p>
        To add a new note, enter some text in the new note field and click the +
        button in the bottom right.
      </p>
      <p>
        To change the label color of a quicknote, click the edit button at the
        top right of the note.
      </p>
      <p>
        To delete a note, click the delete button at the bottom right of the
        notes. Deletions are permanent.
      </p>
      <p>
        All notes are automatically saved when they are edited, created, or
        deleted.
      </p>
    </ModalMenu>
  );
};

export default QNHelp;
