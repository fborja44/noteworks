/* Reusable Modal Menu Component
------------------------------------------------------------------------------*/
// React imports
import React, { useRef, useEffect, useCallback } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Image and icon imports
import XMarkIcon from "../icons/XMarkIcon";
import HelpIcon from "../icons/HelpIcon";

// Component imports
import PageHeaderButton from "../pageheader/PageHeaderButton";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const MenuContainer = styled.div`
  width: fit-content;
  min-width: 325px;
  max-width: 500px;
  height: fit-content;
  background: ${(props) => props.theme.main.background};
  color: ${(props) => props.theme.main.textPrimary};
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  svg {
    width: 21px;
    height: 21px;
    margin-right: 0.625em;
  }
`

const MenuHeader = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.main.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  padding: 0.65em 1.25em 0.65em 1.5em;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 15px;
  max-width: 375px;
  margin-right: 2em;
  color: ${(props) => props.theme.menu.title};
`;

const ModalMenuContentContainer = styled.div`
  display: block;
  width: 100%;
  padding: 1em 1.5em 1.5em 1.5em;

  p {
    margin: 0.5rem 0 0.5rem 0;
  }
`;

export interface ModalMenuProps {
  heading: string;
  icon?: React.ReactNode;
  children: any;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Modal Component
 */
const ModalMenu: React.FC<ModalMenuProps> = ({
  heading,
  icon,
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
              <HeadingContainer>
                {icon}
                <Heading>{heading}</Heading>
              </HeadingContainer>
              <PageHeaderButton
                title="Close"
                onClick={() => setShowMenuState((prev: boolean) => !prev)}
              >
                <XMarkIcon aria-label="Close Menu" />
              </PageHeaderButton>
            </MenuHeader>
            <ModalMenuContentContainer>{children}</ModalMenuContentContainer>
          </MenuContainer>
        </Background>
      ) : null}
    </React.Fragment>
  );
};

export default ModalMenu;
