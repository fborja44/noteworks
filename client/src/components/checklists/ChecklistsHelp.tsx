/* Marknotes Help Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Component imports
import ModalMenu from "../menus/ModalMenu";
import HelpIcon from "../icons/HelpIcon";

export interface ChecklistsHelpProps {
  showChecklistsHelp: boolean;
  setShowChecklistsHelp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChecklistsHelp: React.FC<ChecklistsHelpProps> = ({
  showChecklistsHelp,
  setShowChecklistsHelp,
}) => {
  return (
    <ModalMenu
      heading="Checklists Help"
      icon={<HelpIcon />}
      showMenuState={showChecklistsHelp}
      setShowMenuState={setShowChecklistsHelp}
    >
      <p>
        Checklists are documents that allow you to keep track of items and
        whether or not they have been completed!
      </p>
      <p>To add a new checklist, click the + button in the menu.</p>
      <p>
        To change the label color of a checklist, click the edit button at the
        top right of the checklist, or at the top right of the editor.
      </p>
      <p>
        To delete a checklist, click the delete button at the top right of the
        checklist, or at the top right of the editor. Deletions are permanent.
      </p>
      <p>
        To favorite or unfavorite a checklist, click the favorite button at the
        top left of the checklist, or at the top right of the editor.
      </p>
      <p>To open a checklist, click the on the checklist listed on the page.</p>
      <p>
        You can add and remove checklist items on it's page. Change the order of
        the checklist items using the arrows next to each item. You can toggle
        the checked status of each item using the checkbox.
      </p>
      <p>
        All checklists are automatically saved when they are edited, created, or
        deleted.
      </p>
    </ModalMenu>
  );
};

export default ChecklistsHelp;
