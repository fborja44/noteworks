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
import StarIcon from "../icons/StarIcon";

export interface FavoriteButtonProps {
  favorited: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  favorited,
  onClick,
  color,
}) => {
  return (
    <NoteButton
      title="Favorite"
      className="favorite-note-button note-button"
      onClick={(event) => onClick(event)}
      css={css`
        color: ${color ? color : "inherit"};
        svg {
          width: 16px;
          height: 16px;
        }
      `}
    >
      {<StarIcon filled={favorited} />}
    </NoteButton>
  );
};

export default FavoriteButton;
