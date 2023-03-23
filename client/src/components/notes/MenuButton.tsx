/* Menu Button Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import NoteButton from "./NoteButton";

// Image and icon imports
import DropdownMenu from "../dropdown/DropdownMenu";
import EllipsisVerticalIcon from "../icons/EllipsisVerticalIcon";

export interface MenuButtonProps {
  item: Quicknote | Marknote | Group;
  toggleGroupMenu:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  toggleColorMenu:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  toggleConfirmDelete:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const MenuButton: React.FC<MenuButtonProps> = ({
  item,
  toggleGroupMenu,
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
        <EllipsisVerticalIcon
          css={css`
            height: 16px;
            width: 16px;
            color: inherit;
          `}
        />
      </NoteButton>
      <DropdownMenu
        item={item}
        open={open}
        setOpen={setOpen}
        toggleGroupMenu={toggleGroupMenu}
        toggleColorMenu={toggleColorMenu}
        toggleConfirmDelete={toggleConfirmDelete}
      />
    </React.Fragment>
  );
};

export default MenuButton;
