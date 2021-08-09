/* Reusable Modal Menu Component
------------------------------------------------------------------------------*/
// React imports
import React, { useRef, useEffect, useCallback } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../../common/color";
// import { lightTheme } from "../../common/theme";

// Image and icon imports
import { MdClose } from "react-icons/md";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const MenuContainer = styled.div`
  width: fit-content;
  max-width: 500px;
  height: fit-content;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.4);
  background: ${(props) => props.theme.main.backgroundSecondary};
  color: ${(props) => props.theme.main.textPrimary};
  position: relative;
  z-index: 10;
  padding: 1.5rem 2rem;
  border-radius: 5px;
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;

  margin-bottom: 0.9rem;
`;

const Heading = styled.h1`
  margin: 0 2rem 0 0;
  font-size: 18px;
  color: ${(props) => props.theme.menu.title};
`;

const Close = css`
  &:hover {
    cursor: pointer;
    color: ${COLOR.BLUE_DARK};
    transition: color 0.2s linear 0s;
  }
`;

const ModalMenuContentContainer = styled.div`
  display: block;
  width: 100%;

  p {
    margin: 0.5rem 0 0.5rem;
  }
`;

export interface ModalMenuProps {
  heading: string;
  children: any;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Modal Component
 */
const ModalMenu: React.FC<ModalMenuProps> = ({
  heading,
  children,
  showMenuState,
  setShowMenuState,
}) => {
  const menuRef: any = useRef();

  /**
   * Closes the menu
   * Event can be from any element
   */
  const closeMenu = (
    event: any,
    setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (menuRef.current === event.target) {
      setShowMenuState(false);
    }
  };

  /**
   * Closes menu on ESC keypress
   */
  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showMenuState) {
        setShowMenuState(false);
      }
    },
    [showMenuState, setShowMenuState]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <React.Fragment>
      {/** Ternary Operator decides whether to show the menu or not */}
      {showMenuState ? (
        <Background
          ref={menuRef}
          onClick={(event) => closeMenu(event, setShowMenuState)}
        >
          <MenuContainer>
            <MenuHeader>
              <Heading>{heading}</Heading>
              <MdClose
                css={Close}
                aria-label="Close Menu"
                onClick={() => setShowMenuState((prev: boolean) => !prev)}
              />
            </MenuHeader>
            <ModalMenuContentContainer>{children}</ModalMenuContentContainer>
          </MenuContainer>
        </Background>
      ) : null}
    </React.Fragment>
  );
};

export default ModalMenu;
