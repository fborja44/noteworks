/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import ModalMenu from "./ModalMenu";
import ColorOption from "./ColorOption";

const ColorMenuContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 20px);
  grid-column-gap: 1.25rem;
  grid-template-rows: repeat(2, 20px);
  grid-row-gap: 1rem;
  width: fit-content;
  margin: 0 auto 0 auto;
  padding: 0.5rem 2rem 1rem 2rem;
`;

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
  const handleClick = (event: any) => {
    handleEditColor(event.target.dataset.color);
    setShowColorMenu(false);
  };

  return (
    <ModalMenu
      heading="Choose Note Color"
      showMenuState={showColorMenu}
      setShowMenuState={setShowColorMenu}
    >
      <ColorMenuContent>
        <ColorOption handleClick={handleClick} color={COLOR.RED} title="Red" />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.ORANGE}
          title="Orange"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.YELLOW}
          title="Yellow"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.GREEN}
          title="Green"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.BLUE}
          title="Blue"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.PURPLE}
          title="Purple"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.PINK}
          title="Pink"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.CYAN}
          title="Cyan"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.LEMON}
          title="Lemon"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.LIME}
          title="Lime"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.GREY}
          title="Grey"
        />
        <ColorOption
          handleClick={(event) => handleClick(event)}
          color={COLOR.GREY_DARK}
          title="Dark Grey"
        />
      </ColorMenuContent>
    </ModalMenu>
  );
};

export default ColorMenu;
