import styled from "@emotion/styled";
import { COLOR } from "../../common/color";
import ExclamationCircleIcon from "../icons/ExclamationCircleIcon";

const AlertContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0 1em;
  margin-bottom: 1.5em;

  background: ${COLOR.red.primary};
  color: white;

  width: 100%;
  height: 40px;
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
}

const Alert = ({ children }: AlertProps) => {
  return (
    <AlertContainer>
      <ExclamationCircleIcon strokeWidth={2}/>
      {children}
    </AlertContainer>
  );
};

export default Alert;
