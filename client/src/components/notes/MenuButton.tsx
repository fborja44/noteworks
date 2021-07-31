/* Menu Button Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Component imports
import NoteButton from "./NoteButton";

// Image and icon imports
import { IoMdMenu } from "react-icons/io";

export interface MenuButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick }) => {
  return (
    <NoteButton
      title="Options"
      onClick={(event) => onClick(event)}
      css={css`
        margin-right: 0.4em;
      `}
    >
      <IoMdMenu />
    </NoteButton>
  );
};

export default MenuButton;
