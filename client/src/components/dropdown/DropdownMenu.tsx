/* Dropdown Menu Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Component imports
import DropdownItem from "./DropdownItem";

// Image and icon imports
import { MdColorLens, MdDeleteForever, MdFolderOpen } from "react-icons/md";

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
  top: 24px;
  left: 260px;
  width: fit-content;
  transform: translateX(-45%);
  background: ${(props) =>
    props.theme.id === "light" ? "white" : props.theme.main.background};
  border-radius: 2px;
  padding: 0.5em 0.6em;
  border: 1px solid #828282;
  overflow: hidden;
  transition: height 500ms ease;
  font-size: 12px;
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
  toggleConfirmDelete:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  open,
  setOpen,
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
        `}
      >
        <Menu>
          <DropdownItem
            setOpen={setOpen}
            icon={<MdColorLens />}
            onClick={toggleColorMenu}
          >
            Change Label Color
          </DropdownItem>
          <DropdownItem
            setOpen={setOpen}
            icon={<MdFolderOpen />}
            onClick={() => null}
          >
            Add to Group
          </DropdownItem>
          <DropdownItem
            setOpen={setOpen}
            icon={<MdDeleteForever />}
            onClick={toggleConfirmDelete}
          >
            Delete Note
          </DropdownItem>
        </Menu>
      </DropdownContainer>
    </React.Fragment>
  );
};

export default DropdownMenu;
