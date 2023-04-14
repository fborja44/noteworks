/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { useHistory } from "react-router-dom";
import { doSignOut } from "../../firebase/Firebase";
import ArrowRightOnRectangleIcon from "../icons/ArrowRightOnRectangleIcon";
import { setSelectedTab } from "../../redux/actions";
import { useDispatch } from "react-redux";

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
      background: ${(props) => props.theme.sidebar.backgroundSecondary};
      color: ${(props) => props.theme.sidebar.textSecondary};
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ProfileButton = () => {
  // History hook
  const history = useHistory();

  // Dispatch hook
  const dispatch = useDispatch();

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
        title="Sign Out"
        onClick={() => {
          doSignOut();
          history.push("/");
          dispatch(setSelectedTab("/"));
        }}
      >
        <ArrowRightOnRectangleIcon />
      </button>
    </ButtonContainer>
  );
};

export default ProfileButton;
