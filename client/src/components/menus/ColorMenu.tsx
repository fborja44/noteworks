/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Common imports
import { COLOR, ColorId } from "../../common/color";

// Component imports
import ModalMenu from "./ModalMenu";
import ColorOption from "./ColorOption";
import { IoColorPalette } from "react-icons/io5";

const ColorMenuContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 30px);
  grid-column-gap: 1.5rem;
  grid-template-rows: repeat(2, 30px);
  grid-row-gap: 1.5em;
  width: fit-content;
  margin: 1em auto;
  padding: 0.5rem 2rem 1rem 2rem;
`;

export interface ColorMenuProps {
  showColorMenu: boolean;
  setShowColorMenu: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditColor: (color: ColorId) => void;
}

const ColorMenu: React.FC<ColorMenuProps> = ({
  showColorMenu,
  setShowColorMenu,
  handleEditColor,
}) => {
  /**
   * On click handler to change color of note.
   * Updates the note's color using the id of the color.
   * Event target needs dataset attribute.
   */
  const handleClick = (event: any) => {
    handleEditColor(event.target.dataset.color);
    setShowColorMenu(false);
  };

  return (
    <ModalMenu
      heading="Choose Label Color"
      icon={<IoColorPalette />}
      showMenuState={showColorMenu}
      setShowMenuState={setShowColorMenu}
    >
      <ColorMenuContent>
        <ColorOption handleClick={handleClick} color={COLOR.red} title="Red" />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.orange}
          title="Orange"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.yellow}
          title="Yellow"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.green}
          title="Green"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.blue}
          title="Blue"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.purple}
          title="Purple"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.magenta}
          title="Magenta"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.cyan}
          title="Cyan"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.lemon}
          title="Lemon"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.lime}
          title="Lime"
        />
        <ColorOption
          handleClick={handleClick}
          color={COLOR.grey}
          title="Grey"
        />
        <ColorOption
          handleClick={(event) => handleClick(event)}
          color={COLOR.dark_grey}
          title="Dark Grey"
        />
      </ColorMenuContent>
    </ModalMenu>
  );
};

export default ColorMenu;
