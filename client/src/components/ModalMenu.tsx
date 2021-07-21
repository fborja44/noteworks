// React imports
import React, { useRef, useEffect, useCallback } from "react";

// Image and icon imports
import { MdClose } from "react-icons/md";

export interface ModalMenuProps {
  heading: string;
  children: any;
  showMenuState: any;
  setShowMenuState: any;
}

const ModalMenu = ({
  heading,
  children,
  showMenuState,
  setShowMenuState,
}: ModalMenuProps) => {
  const menuRef: any = useRef();

  /**
   * Closes the menu
   * TODO: Update event and setShowMenuState type
   */
  const closeMenu = (event: any, setShowMenuState: any) => {
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
    <div
      ref={menuRef}
      onClick={(event) => closeMenu(event, setShowMenuState)}
      className="modal-menu-background"
    >
      <section className="modal-menu-wrapper">
        <div className="modal-menu-header">
          <h1 className="modal-menu-title">{heading}</h1>
          <MdClose
            className="modal-menu-close-button"
            aria-label="Close Menu"
            onClick={() => setShowMenuState((prev: any) => !prev)}
          />
        </div>
        <div className="modal-menu-content-container">{children}</div>
      </section>
    </div>
  );
};

export default ModalMenu;
