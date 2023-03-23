/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import ChevronDownIcon from "../icons/ChevronDownIcon";

const ButtonContainer = styled.div`
  background: ${(props) => props.theme.title.backgroundSecondary};
  color: ${(props) => props.theme.title.textSecondary};
  height: 32px;
  outline: none;
  border: none;
  padding: 0;

  margin-right: 0.75em;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  span {
    padding: 0 1em;
  }

  button {
    display: flex;
    font-size: 12px;
    align-items: center;
    color: ${(props) => props.theme.title.textSecondary};
    height: 100%;
    width: fit-content;
    outline: none;
    background: inherit;
    box-shadow: none;
    border: none;
    border-left: 1px solid ${(props) => props.theme.title.background};

    :hover {
      cursor: pointer;
      background: #313131;
      color: ${(props) => props.theme.sidebar.textSecondary};
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ProfileButton = () => {
  return (
    <ButtonContainer>
      <button
        css={css`
          border-radius: 5px 0px 0px 5px;
          padding: 0 1em;
        `}
      >
        My Profile
      </button>
      <button
        css={css`
          border-radius: 0px 5px 5px 0px;
        `}
      >
        <ChevronDownIcon />
      </button>
    </ButtonContainer>
  );
};

export default ProfileButton;
