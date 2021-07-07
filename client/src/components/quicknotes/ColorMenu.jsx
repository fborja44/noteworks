import React, { useRef, useEffect, useCallback } from "react";

// Image and icon imports
import { MdClose } from "react-icons/md";

const ColorMenu = ({ showColorMenu, setShowColorMenu }) => {
  const menuRef = useRef();

  // Close on click of background
  const closeMenu = (event) => {
    if (menuRef.current === event.target) {
      setShowColorMenu(false);
    }
  };

  // Close on 'ESC' key press
  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showColorMenu) {
        setShowColorMenu(false);
      }
    },
    [showColorMenu, setShowColorMenu]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <React.Fragment>
      {/* Ternary operator to determine whether to render modal */}
      {showColorMenu ? (
        <div ref={menuRef} onClick={closeMenu} className="modal-background">
          <section className="color-menu-wrapper">
            <div className="menu-header">
              <h1 className="menu-title">Choose Note Color</h1>
              <MdClose
                className="menu-close-button"
                aria-label="Close Menu"
                onClick={() => setShowColorMenu((prev) => !prev)}
              />
            </div>
          </section>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ColorMenu;
