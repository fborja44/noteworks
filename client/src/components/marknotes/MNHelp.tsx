/* Marknotes Help Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Component imports
import ModalMenu from "../ModalMenu";

export interface MNHelpProps {
  showMNHelp: any;
  setShowMNHelp: any;
}

const MNHelp = ({ showMNHelp, setShowMNHelp }: MNHelpProps) => {
  return (
    <ModalMenu
      heading="Marknotes"
      showMenuState={showMNHelp}
      setShowMenuState={setShowMNHelp}
    >
      Hello!
    </ModalMenu>
  );
};

export default MNHelp;
