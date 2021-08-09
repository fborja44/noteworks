/* Dropdown Item Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

const Item = styled.div`
  color: ${(props) => props.theme.main.textPrimary};
  height: 28px;
  flex: 1;
  display: flex;
  align-items: center;
  border-radius: 3px;
  transition: background 0.2s;
  padding: 0.2em 0.5em;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${(props) =>
      props.theme.id === "light"
        ? "#e6e6e6"
        : props.theme.main.backgroundSecondary};
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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveMenu?: React.Dispatch<React.SetStateAction<string>>;
  onClick: any;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  onClick,
  setOpen,
  children,
}) => {
  return (
    <Item
      onClick={() => {
        setOpen((prev) => !prev);
        onClick();
      }}
    >
      <IconContainer>{icon}</IconContainer>
      <Text>{children}</Text>
    </Item>
  );
};

export default DropdownItem;
