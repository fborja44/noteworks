/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

const OptionStyles = ({ color }: { color: string }) =>
  css`
    background: ${color};
  `;
const Option = styled.div`
  ${OptionStyles}
  width: 20px;
  height: 20px;
  border: 1px solid #828282;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 2px solid #666666;
  }
`;

export interface ColorOptionProps {
  color: string;
  title: string;
  handleClick: (event: any) => void;
}

const ColorOption: React.FC<ColorOptionProps> = ({
  color,
  title,
  handleClick,
}) => {
  return (
    <Option
      color={color}
      title={title}
      data-color={color}
      onClick={handleClick}
    />
  );
};

export default ColorOption;
