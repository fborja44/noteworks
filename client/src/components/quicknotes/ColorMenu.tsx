// React imports
import React, { useRef, useEffect, useCallback } from "react";

// Common imports
import { COLOR } from "../../common/color";

// Image and icon imports
import { MdClose } from "react-icons/md";

// Component imports
import ModalMenu from "../ModalMenu";

export interface ColorMenuProps {
  showColorMenu: any;
  setShowColorMenu: any;
  setLabelColor: any;
}

const ColorMenu = ({
  showColorMenu,
  setShowColorMenu,
  setLabelColor,
}: ColorMenuProps) => {
  /**
   * On click handler to change color of note
   * TODO: Update event type
   */
  const handleOnClick = (event: any) => {
    setLabelColor(event.target.dataset.color);
    setShowColorMenu(false);
  };

  return (
    <React.Fragment>
      {/* Ternary operator to determine whether to render modal */}
      {showColorMenu ? (
        <ModalMenu
          heading="Choose Note Color"
          showMenuState={showColorMenu}
          setShowMenuState={setShowColorMenu}
        >
          <div className="color-menu-content">
            <div
              onClick={handleOnClick}
              data-color={COLOR.RED}
              className="color-option red"
            ></div>
            <div
              onClick={handleOnClick}
              data-color={COLOR.ORANGE}
              className="color-option orange"
            ></div>
            <div
              onClick={handleOnClick}
              data-color={COLOR.YELLOW}
              className="color-option yellow"
            ></div>
            <div
              onClick={handleOnClick}
              data-color={COLOR.GREEN}
              className="color-option green"
            ></div>
            <div
              onClick={handleOnClick}
              data-color={COLOR.BLUE}
              className="color-option blue"
            ></div>
            <div
              onClick={handleOnClick}
              data-color={COLOR.PURPLE}
              className="color-option purple"
            ></div>
            <div
              onClick={handleOnClick}
              data-color={COLOR.PINK}
              className="color-option pink"
            ></div>
            <div
              onClick={handleOnClick}
              data-color={COLOR.CYAN}
              className="color-option cyan"
            ></div>
          </div>
        </ModalMenu>
      ) : null}
    </React.Fragment>
  );
};

export default ColorMenu;
