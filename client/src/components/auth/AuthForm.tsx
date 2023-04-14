import styled from "@emotion/styled";

// Common imports
import { COLOR } from "../../common/color";

export const ModalContent = styled.div`
  text-align: center;
  padding: 0 1.5em;

  p {
    color: ${(props) => props.theme.main.textSecondary};
    font-size: 13px;
    padding-bottom: 1em;
  }

  small {
    display: block;
    margin-top: 1em;
    color: ${(props) => props.theme.main.textSecondary};

    a {
      color: ${COLOR.blue.primary};
      font-weight: 600;

      &:hover {
        cursor: pointer;
      }

      &:visited {
        color: initial;
      }

      &:clicked {
        color: initial;
      }
    }
  }
`;

export const FormButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 0 auto;
  width: 220px;
  background-color: ${COLOR.blue.primary};
  border: 1px solid ${(props) => props.theme.main.borderColor};
  color: white;
  height: 36px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 13px;

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.blue.secondary};
    transition: background-color 0.1s ease 0s;
  }

  svg {
    margin-left: 0.5em;
    width: 16px;
    height: 16px;
  }
`;

export const Form = styled.form`
  width: 325px;
  margin-bottom: 2em;
`;