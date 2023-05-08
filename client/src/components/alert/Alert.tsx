import styled from "@emotion/styled";

import { COLOR } from "../../common/color";
import ExclamationCircleIcon from "../icons/ExclamationCircleIcon";

const AlertContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.625em 0.875em;
  margin-bottom: 1.5em;

  background: ${COLOR.red.primary};
  color: white;

  width: 100%;
  min-height: 40px;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 600;

  svg {
    height: 24px;
    width: 24px;
    margin-right: 0.75em;
  }
`;

interface AlertProps {
  children: React.ReactNode;
  style?: any;
}

const Alert = ({ children, style }: AlertProps) => {
  return (
    <AlertContainer style={style}>
      <ExclamationCircleIcon strokeWidth={2} />
      <span>{children}</span>
    </AlertContainer>
  );
};

export default Alert;
