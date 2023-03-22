/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

import styled from "@emotion/styled";

export interface PageHeaderButtonProps {
  title: string;
  onClick: any;
  selected?: boolean;
  width?: string;
  height?: string;
}

const StyledButton = styled.div`
  width: ${(props: { width?: string; height?: string }) =>
    props.width ? props.width : "38px"};
  height: ${(props: { width?: string; height?: string }) =>
    props.height ? props.height : "28px"};
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.header.textSecondary};

  button {
    width: 80%;
    height: 100%;
    background: inherit;
    border: none;
    color: inherit;
    font-size: 20px;
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
  title,
  onClick,
  selected,
  children,
  width,
  height,
}) => {
  return (
    <StyledButton title={`${title}`} width={width} height={height}>
      <button onClick={onClick} className={`${selected && "selected"}`}>
        {children}
      </button>
    </StyledButton>
  );
};

PageHeaderButton.defaultProps = {
  selected: false,
};

export default PageHeaderButton;
