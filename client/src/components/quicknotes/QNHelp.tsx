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

const QNHelp: React.FC<QNHelpProps> = ({ showQNHelp, setShowQNHelp }) => {
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
      <p>To add a new note, click the + button in the page header.</p>
      <p>
        To change the label color of a quicknote, click the edit button at the
        top right of the note.
      </p>
      <p>
        To delete a note, click the delete button at the top right of the note.
        Deletions are permanent.
      </p>
      <p>
        To favorite or unfavorite a note, click the favorite button at the top
        left of the note.
      </p>
      <p>
        All notes are automatically saved when they are edited, created, or
        deleted.
      </p>
    </ModalMenu>
  );
};

export default QNHelp;
