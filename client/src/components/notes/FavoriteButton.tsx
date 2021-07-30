/* Favorite Button Component
------------------------------------------------------------------------------*/
// React imports
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Component imports
import NoteButton from "./NoteButton";

// Image and icon imports
import { TiStarOutline, TiStar } from "react-icons/ti";

export interface FavoriteButtonProps {
  favorited: Boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  favorited,
  onClick,
}) => {
  return (
    <NoteButton
      title="Favorite"
      className="favorite-note-button note-button"
      onClick={(event) => onClick(event)}
      css={css`
        color: white;
        margin-right: 0.5em;
      `}
    >
      {favorited ? <TiStar /> : <TiStarOutline />}
    </NoteButton>
  );
};

export default FavoriteButton;
