import React from "react";

// Image and icon imports

const ColorMenu = ({ showColorMenu, setShowColorMenu }) => {
  return (
    <React.Fragment>
      {/* Ternary operator to determine whether to render modal */}
      {showColorMenu ? (
        <div className="modal-background">
          <section className="modal-wrapper">
            <h1>Choose Note Color</h1>
          </section>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default ColorMenu;
