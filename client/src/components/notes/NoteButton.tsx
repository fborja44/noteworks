/* Note Button Component
------------------------------------------------------------------------------*/
/** @jsxRuntime classic */
/** @jsx jsx */
// import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

const NoteButton = styled.button`
  background: none;
  border: none;
  color: var(--note-header-text-color);
  height: 100%;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  position: relative;
  z-index: 5;
  padding: 0;

  &:hover {
    cursor: pointer;
    color: white;
    transition: color 0.2s ease 0s;
  }
`;

export default NoteButton;
