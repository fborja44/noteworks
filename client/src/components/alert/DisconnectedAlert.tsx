/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import styled from "@emotion/styled";

import ExclamationTriangleIcon from "../icons/ExclamationTriangle";
import { useSelector } from "react-redux";

const AlertContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 1em;
  overflow: hidden;

  background: rgba(244, 67, 54, 0.6);
  color: white;

  width: 100%;
  font-size: 13px;
  font-weight: 400;

  transition: height 0.1s;

  span {
    position: relative;
    bottom: 2px;
  }

  svg {
    height: 22px;
    width: 22px;
    margin-right: 0.875em;
  }
`;

const DisconnectedAlert = () => {
  const connected = useSelector((state: any) => state.connectionState);

  return (
    <AlertContainer
      css={css`
        height: ${!connected ? "45px" : "0px"};
      `}
    >
      <ExclamationTriangleIcon strokeWidth={2} />
      <span>
        Error: Unable to establish connection to server. Any changes made will
        not be saved.
      </span>
    </AlertContainer>
  );
};

export default DisconnectedAlert;
