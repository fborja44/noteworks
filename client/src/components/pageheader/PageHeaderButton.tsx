/* Page Header Button Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { Tooltip } from "react-tooltip";

export interface PageHeaderButtonProps {
  id: string;
  title: string;
  onClick: Function;
  selected?: boolean;
  width?: string;
  height?: string;
}

const StyledButton = styled.div`
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.header.textSecondary};
  ${(props: { width?: string; height?: string }) =>
    !props.width && !props.height && "margin-left: 0.5em;"}
  width: ${(props: { width?: string; height?: string }) =>
    props.width ? props.width : "32px"};

  button {
    width: ${(props: { width?: string; height?: string }) =>
      props.width ? props.width : "32px"};
    height: ${(props: { width?: string; height?: string }) =>
      props.height ? props.height : "28px"};
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

    &.selected {
      background: ${(props) => props.theme.header.backgroundSecondary};
    }

    &:hover {
      cursor: pointer;
      background: ${(props) => props.theme.header.backgroundSecondary};
      // transition: background-color 0.2s ease 0s;
    }

    svg {
      width: 20px;
      height: 20px;
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

const PageHeaderButton: React.FC<PageHeaderButtonProps> = ({
  id,
  title,
  onClick,
  selected,
  children,
  width,
  height,
}) => {
  return (
    <>
      <StyledButton
        data-tooltip-id={id}
        data-tooltip-content={title}
        id={id}
        width={width}
        height={height}
      >
        <button
          onClick={() => onClick()}
          className={`${selected && "selected"}`}
        >
          {children}
        </button>
      </StyledButton>
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

PageHeaderButton.defaultProps = {
  selected: false,
};

export default PageHeaderButton;
