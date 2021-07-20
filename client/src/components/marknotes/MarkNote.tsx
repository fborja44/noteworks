// React imports
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Component imports

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
export interface MarknoteProps {
  id: string;
  title: string;
  body: string;
  lastModified: number;
}

const Marknote = ({ id, title, body, lastModified }: MarknoteProps) => {
  return (
    <Link className="marknote-link" to={`/marknotes/${id}`}>
      <div className="marknote">
        <div className="marknote-header">
          <span className="marknote-name">{title}</span>
        </div>
        <div className="marknote-content">
          <span>
            {body.length > 0 ? body && body.substr(0, 150) + "..." : "Empty"}
          </span>
          <div className="marknote-footer">
            <small>Last Modifed:</small>
            <small>
              {new Date(lastModified).toLocaleDateString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Marknote;
