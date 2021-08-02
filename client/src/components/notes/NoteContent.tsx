/* Note Button Component
------------------------------------------------------------------------------*/
/** @jsxRuntime classic */
/** @jsx jsx */
// import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

export const MarknoteBody = styled.div`
  height: 100%;
  padding: 0.5rem;
  color: var(--note-text-color-primary);
`;

export const QuicknoteBody = styled.textarea`
  height: 100%;
  padding: 0.5rem;
  color: var(--note-text-color-primary);
`;

const NoteContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  white-space: pre-wrap; /* keep spacing added to text */
  color: var(--note-text-color-primary);
  font-weight: 500;
  width: 100%;
  height: 100%;
`;

export default NoteContent;
