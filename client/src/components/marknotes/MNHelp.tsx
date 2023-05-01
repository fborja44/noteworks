/* Marknotes Help Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Component imports
import ModalMenu from "../menus/ModalMenu";
import HelpIcon from "../icons/HelpIcon";

export interface MNHelpProps {
  showMNHelp: boolean;
  setShowMNHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const MNHelp: React.FC<MNHelpProps> = ({ showMNHelp, setShowMNHelp }) => {
  return (
    <ModalMenu
      heading="Marknotes Help"
      icon={<HelpIcon />}
      showMenuState={showMNHelp}
      setShowMenuState={setShowMNHelp}
    >
      <p>
        Marknotes are editable documents where you can use markdown syntax in
        your notes to add styling.
      </p>
      <p>To add a new note, click the + button in the menu.</p>
      <p>
        To change the label color of a note, click the edit button at the
        top right of the note, or at the top right of the editor.
      </p>
      <p>
        To delete a note, click the delete button at the top right of the note,
        or at the top right of the editor. Deletions are permanent.
      </p>
      <p>
        To favorite or unfavorite a note, click the favorite button at the top
        left of the note, or at the top right of the editor.
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
