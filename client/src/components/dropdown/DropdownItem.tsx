/* Dropdown Item Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

const Item = styled.div`
  color: ${(props) => props.theme.main.textPrimary};
  height: 25px;
  width: fit-content;
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: background 0.2s;
  padding: 0 0.5em;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: #e6e6e6;
  }
`;

const IconContainer = styled.span`
  font-size: 20px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    filter: none;
  }
`;

const Text = styled.div`
  margin-left: 0.2em;
`;

export interface DropdownItemProps {
  icon?: any;
  goToMenu?: string;
  setActiveMenu?: React.Dispatch<React.SetStateAction<string>>;
  onClick: any;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  onClick,
  children,
}) => {
  return (
    <Item onClick={onClick()}>
      <IconContainer>{icon}</IconContainer>
      <Text>{children}</Text>
    </Item>
  );
};

export default DropdownItem;
