/* Dropdown Menu Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Checklist, Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import DropdownItem from "./DropdownItem";

// Image and icon imports
import { IoColorPalette } from "react-icons/io5";
import FolderOpenIcon from "../icons/FolderOpenIcon";
import TrashIcon from "../icons/TrashIcon";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: default;
  user-select: none;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 260px;
  width: fit-content;
  transform: translateX(-45%);
  background: ${(props) => props.theme.header.backgroundSecondary};
  border-radius: 8px;
  padding: 0.5em 0.5em 0.25em 0.5em;
  border: 1px solid ${(props) => props.theme.note.borderColor};
  overflow: hidden;
  transition: height 250ms;
  font-size: 12px;
  cursor: default;
`;

const Menu = styled.div`
  width: 100%;
`;

export interface DropdownMenuProps {
  item: Quicknote | Marknote | Checklist | Group;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleGroupMenu?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  toggleColorMenu:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
  toggleConfirmDelete:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  item,
  open,
  setOpen,
  toggleGroupMenu,
  toggleColorMenu,
  toggleConfirmDelete,
}) => {
  // const [activeMenu, setActiveMenu] = useState("");
  // const [menuHeight, setMenuHeight] = useState(null);

  /**
   * Function to set the element height state
   * @param el Menu element
   */
  // const calcHeight = (el: any) => {
  //   const height = el.offsetHeight;
  //   setMenuHeight(height);
  // };

  return (
    <React.Fragment>
      {open && (
        <Background
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
            setOpen(!open);
          }}
        />
      )}
      <DropdownContainer
        css={css`
          opacity: ${open ? "1" : "0"};
          max-height: ${open ? "500px" : "0px"};
          z-index: ${open ? "200" : "0"};
          transition: max-height 1s ease, opacity 0.1s ease;
          ${item.type === "group" ? "left: 200px; top: 33px;" : ""}
        `}
      >
        <Menu>
          {item.type !== "group" && toggleGroupMenu && (
            <DropdownItem
              setOpen={setOpen}
              icon={<FolderOpenIcon filled />}
              onClick={toggleGroupMenu}
            >
              Manage Groups
            </DropdownItem>
          )}
          <DropdownItem
            setOpen={setOpen}
            icon={<IoColorPalette />}
            onClick={toggleColorMenu}
          >
            Change Color
          </DropdownItem>
          <div
            css={css`
              height: 28px;
            `}
          />
          <DropdownItem
            setOpen={setOpen}
            icon={<TrashIcon filled />}
            onClick={toggleConfirmDelete}
            warning
          >
            Delete {item.type !== "group" ? "Note" : "Group"}
          </DropdownItem>
        </Menu>
      </DropdownContainer>
    </React.Fragment>
  );
};

export default DropdownMenu;
