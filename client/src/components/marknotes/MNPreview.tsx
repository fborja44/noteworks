/* Marknote Preview Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import ReactMarkdown from "react-markdown";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Marknote } from "../../common/types";

const Page = styled.section`
  width: 8in;
  height: 8in;
`;

/**
 * Preview component proptypes
 */
export interface MNPreviewProps {
  currentNote: Marknote;
}

const MNPreview = ({ currentNote }: MNPreviewProps) => {
  return <div></div>;
};

export default MNPreview;
