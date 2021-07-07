// React imports
import React, { useRef, useEffect, useCallback } from "react";

// Common imports
import { COLOR } from "../../common/color";

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

  // Option on hover: Display checkmark
  const handleMouseHover = (event) => {
    event.target.style.display = "block";
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
              <div
                onClick={handleOnClick}
                data-color={COLOR.RED}
                className="color-option red"
              ></div>
              <div
                onClick={handleOnClick}
                data-color={COLOR.ORANGE}
                className="color-option orange"
              ></div>
              <div
                onClick={handleOnClick}
                data-color={COLOR.YELLOW}
                className="color-option yellow"
              ></div>
              <div
                onClick={handleOnClick}
                data-color={COLOR.GREEN}
                className="color-option green"
              ></div>
              <div
                onClick={handleOnClick}
                data-color={COLOR.BLUE}
                className="color-option blue"
              ></div>
              <div
                onClick={handleOnClick}
                data-color={COLOR.PURPLE}
                className="color-option purple"
              ></div>
              <div
                onClick={handleOnClick}
                data-color={COLOR.PINK}
                className="color-option pink"
              ></div>
              <div
                onClick={handleOnClick}
                data-color={COLOR.CYAN}
                className="color-option cyan"
              ></div>
            </div>
          </section>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ColorMenu;
