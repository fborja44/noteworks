/* Dropdown Menu Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Component imports
import DropdownItem from "./DropdownItem";

// Image and icon imports
import { MdColorLens, MdFolderOpen } from "react-icons/md";

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
  z-index: 100;
  cursor: default;
  user-select: none;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 260px;
  width: fit-content;
  transform: translateX(-45%);
  background-color: white;
  border: 1px solid #828282;
  border-radius: 2px;
  padding: 0.5em 0.6em;
  overflow: hidden;
  transition: height 500ms ease;
  font-size: 12px;
  z-index: 200;
  cursor: default;
`;

const Menu = styled.div`
  width: 100%;
`;

export interface DropdownMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleColorMenu:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open,
  setOpen,
  toggleColorMenu,
}) => {
  const [activeMenu, setActiveMenu] = useState("");
  const [menuHeight, setMenuHeight] = useState(null);

  /**
   * Function to set the element height state
   * @param el Menu element
   */
  const calcHeight = (el: any) => {
    const height = el.offsetHeight;
    setMenuHeight(height);
  };

  return (
    <React.Fragment>
      <Background
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          event.nativeEvent.stopImmediatePropagation();
          setOpen(!open);
        }}
      />
      <DropdownContainer>
        <Menu>
          <DropdownItem icon={<MdColorLens />} onClick={() => {}}>
            Change Label Color
          </DropdownItem>
          <DropdownItem onClick={toggleColorMenu}>Add to Group</DropdownItem>
        </Menu>
      </DropdownContainer>
    </React.Fragment>
  );
};

export default DropdownMenu;
