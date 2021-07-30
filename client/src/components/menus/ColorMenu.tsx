/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import ModalMenu from "./ModalMenu";

// Image and icon imports

export interface ColorMenuProps {
  showColorMenu: boolean;
  setShowColorMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditColor: (color: string) => void;
}

const ColorMenu: React.FC<ColorMenuProps> = ({
  showColorMenu,
  setShowColorMenu,
  handleEditColor,
}) => {
  /**
   * On click handler to change color of note.
   * Event target needs dataset attribute.
   */
  const handleOnClick = (event: any) => {
    handleEditColor(event.target.dataset.color);
    setShowColorMenu(false);
  };

  return (
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
          title="Red"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.ORANGE}
          className="color-option orange"
          title="Orange"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.YELLOW}
          className="color-option yellow"
          title="Yellow"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.GREEN}
          className="color-option green"
          title="Green"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.BLUE}
          className="color-option blue"
          title="Blue"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.PURPLE}
          className="color-option purple"
          title="Purple"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.PINK}
          className="color-option pink"
          title="Pink"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.CYAN}
          className="color-option cyan"
          title="Cyan"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.LEMON}
          className="color-option lemon"
          title="Lemon"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.LIME}
          className="color-option lime"
          title="Lime"
        />
        <div
          onClick={handleOnClick}
          data-color={COLOR.GREY}
          className="color-option grey"
          title="Grey"
        />
        <div
          onClick={(event) => handleOnClick(event)}
          data-color={COLOR.GREY_DARK}
          className="color-option grey-dark"
          title="Dark Grey"
        />
      </div>
    </ModalMenu>
  );
};

export default ColorMenu;
