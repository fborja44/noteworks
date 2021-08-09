/* Menu Button Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Component imports
import NoteButton from "./NoteButton";

// Image and icon imports
import { IoMdMenu } from "react-icons/io";
import DropdownMenu from "../dropdown/DropdownMenu";

export interface MenuButtonProps {
  toggleColorMenu:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  toggleConfirmDelete:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const MenuButton: React.FC<MenuButtonProps> = ({
  toggleColorMenu,
  toggleConfirmDelete,
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <NoteButton
        title="Options"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
          setOpen(!open);
        }}
        css={css`
          ${open ? "z-index: 1000" : null}
        `}
      >
        <IoMdMenu
          css={
            open
              ? css`
                  color: white;
                `
              : null
          }
        />
      </NoteButton>
      <DropdownMenu
        open={open}
        setOpen={setOpen}
        toggleColorMenu={toggleColorMenu}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </React.Fragment>
  );
};

export default MenuButton;
