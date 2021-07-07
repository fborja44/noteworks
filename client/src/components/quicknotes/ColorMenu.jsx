import React, { useRef, useEffect, useCallback } from "react";

// Image and icon imports
import { MdClose } from "react-icons/md";

const ColorMenu = ({ showColorMenu, setShowColorMenu, setLabelColor }) => {
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

  const handleOnClick = (event) => {
    setLabelColor(event.target.dataset.color);
    setShowColorMenu(false);
  };

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
            <div className="color-menu-content">
              <div onClick={handleOnClick} data-color="RED" className="color-option red"></div>
              <div onClick={handleOnClick} data-color="ORANGE " className="color-option orange"></div>
              <div onClick={handleOnClick} data-color="YELLOW" className="color-option yellow"></div>
              <div onClick={handleOnClick} data-color="GREEN" className="color-option green"></div>
              <div onClick={handleOnClick} data-color="BLUE" className="color-option blue"></div>
              <div onClick={handleOnClick} data-color="PURPLE" className="color-option purple"></div>
              <div onClick={handleOnClick} data-color="PINK" className="color-option pink"></div>
              <div onClick={handleOnClick} data-color="CYAN" className="color-option cyan"></div>
            </div>
          </section>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ColorMenu;
