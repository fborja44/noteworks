/* Reusable Modal Menu Component
------------------------------------------------------------------------------*/
// React imports
import React, { useRef, useEffect, useCallback } from "react";

// Image and icon imports
import { MdClose } from "react-icons/md";

export interface ModalMenuProps {
  heading: string;
  children: any;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

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
                onClick={() => setShowMenuState((prev: boolean) => !prev)}
              />
            </div>
            <div className="modal-menu-content-container">{children}</div>
          </section>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ModalMenu;
