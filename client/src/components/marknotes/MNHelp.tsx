/* Marknotes Help Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Component imports
import ModalMenu from "../menus/ModalMenu";

export interface MNHelpProps {
  showMNHelp: any;
  setShowMNHelp: any;
}

const MNHelp = ({ showMNHelp, setShowMNHelp }: MNHelpProps) => {
  return (
    <ModalMenu
      heading="Marknotes Help"
      showMenuState={showMNHelp}
      setShowMenuState={setShowMNHelp}
    >
      <p>
        Marknotes are editable documents where you can use markdown syntax in
        your notes to add styling.
      </p>
      <p>To add a new note, click the + button in the menu.</p>
      <p>
        To delete a note, click the delete button at the top right of the notes.
        Deletions are permanent.
      </p>
      <p>
        To open the editor to edit and preview your marknotes, click the
        marknote in the menu.
      </p>
      <p>
        All notes are automatically saved when they are edited, created, or
        deleted.
      </p>
    </ModalMenu>
  );
};

export default MNHelp;
