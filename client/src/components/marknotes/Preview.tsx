/* Marknote Preview Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import ReactMarkdown from "react-markdown";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// Component imports
import { MarknoteProps } from "./Marknote";

const Page = styled.section`
  width: 8in;
  height: 8in;
`;


/**
 * Preview component proptypes
 */
export interface PreviewProps {
  currentNote: MarknoteProps;
}

const Preview = ({currentNote}: PreviewProps) => {
  return <div></div>;
};

export default Preview;
