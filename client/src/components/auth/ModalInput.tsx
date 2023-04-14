/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

import styled from "@emotion/styled";
import { COLOR } from "../../common/color";

const Container = styled.div`
  margin-bottom: 1.5em;

  .error {
    margin-top: 0.5em;
    color: ${COLOR.red.primary};
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: ${(props) => props.theme.header.textSecondary};

  svg {
    position: absolute;
    height: 22px;
    width: 22px;
    left: 12px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  padding: 0.2em 0.5em 0.2em 3.4em;
  font-size: 13px;
  color: ${(props) => props.theme.header.textSecondary};
  background-color: ${(props) => props.theme.header.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.title.borderColor};
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

interface ModalInput {
  icon?: React.ReactNode;
  placeholder?: string;
  name?: string;
  id?: string;
  type?: "text" | "email" | "password";
  error?: string;
}

const ModalInput = ({
  icon,
  placeholder,
  name,
  id,
  type,
  error,
}: ModalInput) => {
  return (
    <Container>
      <InputContainer>
        {icon}
        <Input
          type={type}
          onChange={() => {}}
          placeholder={placeholder}
          name={name}
          id={id}
        />
      </InputContainer>
      {error && <small className="error">Error: {error}</small>}
    </Container>
  );
};

ModalInput.defaultProps = {
  type: "text",
};

export default ModalInput;
