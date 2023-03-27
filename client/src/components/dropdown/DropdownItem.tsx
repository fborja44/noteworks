/* Dropdown Item Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common Imports
import { COLOR } from "../../common/color";

const Item = styled.div`
  color: ${(props) => props.theme.main.textSecondary};
  ${(props: { warning: boolean | undefined }) =>
    props.warning && `color: ${COLOR.red.primary};`}
  height: 28px;
  flex: 1;
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 0.75em 0.75em 0.75em 0.5em;
  margin-bottom: 0.25em;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${(props) => props.theme.sidebar.backgroundSecondary};
    color: ${(props) => props.theme.main.textPrimary};
    ${(props: { warning: boolean | undefined }) =>
      props.warning && `color: ${COLOR.red.primary};`}
  }
`;

const IconContainer = styled.span`
  font-size: 20px;
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
  }

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
  warning?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  icon,
  onClick,
  setOpen,
  children,
  warning,
}) => {
  return (
    <Item
      onClick={() => {
        setOpen((prev) => !prev);
        onClick();
      }}
      warning={warning}
    >
      <IconContainer>{icon}</IconContainer>
      <Text>{children}</Text>
    </Item>
  );
};

export default DropdownItem;
