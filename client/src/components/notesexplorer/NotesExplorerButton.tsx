/* Notes Explorer Button Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { Tooltip } from "react-tooltip";

export interface NotesExplorerButtonProps {
  id: string;
  title: string;
  onClick: Function;
  selected?: boolean;
}

const ButtonContainer = styled.div`
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  button {
    width: 27px;
    height: 27px;
    background: inherit;
    border: none;
    color: inherit;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    -webkit-user-select: none;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.header.backgroundSecondary};
      // transition: background-color 0.2s ease 0s;
    }

    svg {
      width: 25px;
      height: 25px;
    }
  }

  a {
    color: ${(props) => props.theme.header.textPrimary};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::visited {
      color: ${(props) => props.theme.header.textPrimary};
    }
  }
`;

const NotesExplorerButton: React.FC<NotesExplorerButtonProps> = ({
  id,
  title,
  onClick,
  selected,
  children,
}) => {
  return (
    <>
      <ButtonContainer data-tooltip-id={id} data-tooltip-content={title}>
        <button
          onClick={() => onClick()}
          className={`${selected && "selected"}`}
        >
          {children}
        </button>
      </ButtonContainer>
      <Tooltip
        css={css`
          font-size: 12px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 5px;
          z-index: 1000;
        `}
        id={id}
        place="bottom"
      />
    </>
  );
};

NotesExplorerButton.defaultProps = {
  selected: false,
};

export default NotesExplorerButton;
