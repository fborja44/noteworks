/* Toggle Switch Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../../common/color";

// Tutorial from: https://www.youtube.com/watch?v=bztDMD4HSL0
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 22px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }

  input:checked + .slider {
    background-color: #424247; /* Toggled on background color */
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${COLOR.grey.primary};
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 5px;
    bottom: 3px;
    background-color: ${(props) => props.theme.id === "light" ? "white" : props.theme.title.textSecondary};
    transition: 0.25s;
    border-radius: 50%;
  }
`;

export interface ToggleSwitchProps {
  isToggled: boolean;
  onToggle: () => any;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isToggled, onToggle }) => {
  return (
    <Switch>
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <Slider className="slider" />
    </Switch>
  );
};

export default ToggleSwitch;
