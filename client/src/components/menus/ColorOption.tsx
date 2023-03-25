/* Color Menu Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { COLOR, NoteColor } from "../../common/color";

const OptionStyles = ({ primaryColor }: { primaryColor: string }) =>
  css`
    background: ${primaryColor};
  `;
const Option = styled.div`
  ${OptionStyles}
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid white;
  }
`;

export interface ColorOptionProps {
  color: NoteColor;
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
      primaryColor={color.primary}
      title={title}
      data-color={color.id}
      onClick={handleClick}
    />
  );
};

export default ColorOption;
