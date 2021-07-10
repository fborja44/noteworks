// React imports
import React, { useRef, useEffect, useCallback } from "react";

// Common imports
import { COLOR } from "../../common/color";

// Image and icon imports
import { MdClose } from "react-icons/md";

interface ColorMenuProps {
  showColorMenu: any
  setShowColorMenu: any
  setLabelColor: any
}

const ColorMenu = ({ showColorMenu, setShowColorMenu, setLabelColor }: ColorMenuProps) => {
  const menuRef: any = useRef();

  /**
   * Closes the menu
   * TODO: Update event type
   */
  const closeMenu = (event: any) => {
    if (menuRef.current === event.target) {
      setShowColorMenu(false);
    }
  };

  /**
   * Closes menu on ESC keypress
   */
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

  /**
   * On click handler to change color of note
   * TODO: Update event type
   */
  const handleOnClick = (event: any) => {
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
                onClick={() => setShowColorMenu((prev: any) => !prev)}
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
