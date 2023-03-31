/* Notes Explorer Button Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

import styled from "@emotion/styled";

export interface NotesExplorerButtonProps {
  title: string;
  onClick: Function;
  selected?: boolean;
}

const StyledButton = styled.div`
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
  title,
  onClick,
  selected,
  children,
}) => {
  return (
    <StyledButton title={`${title}`}>
      <button onClick={() => onClick()} className={`${selected && "selected"}`}>
        {children}
      </button>
    </StyledButton>
  );
};

NotesExplorerButton.defaultProps = {
  selected: false,
};

export default NotesExplorerButton;
