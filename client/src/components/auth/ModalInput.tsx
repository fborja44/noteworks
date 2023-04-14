/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

import styled from "@emotion/styled";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
  position: relative;
  color: ${(props) => props.theme.header.textSecondary};

  svg {
    position: absolute;
    height: 22px;
    width: 22px;
    left: 16px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 38px;
  margin-left: 0.3rem;
  padding: 0.2em 0.5em 0.2em 3.5em;
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
}

const ModalInput = ({ icon, placeholder, name, id, type }: ModalInput) => {
  return (
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
  );
};

ModalInput.defaultProps = {
  type: "text",
};

export default ModalInput;
