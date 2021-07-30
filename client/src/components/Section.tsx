/* Section Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

export const SectionContainer = styled.section`
  margin-bottom: 1em;
`;

export const SectionHeader = styled.div`
  border-bottom: solid 1px #5f5f5f;
  margin-bottom: 1em;
`;

export const SectionTitle = styled.h1`
  margin: 0 0 0.5em 0;
  font-size: 16px;
  font-weight: 700;
  color: #4f4f4f;
  display: flex;
  align-items: center;
  * {
    margin-right: 0.2em;
  }
`;

export interface SectionProps {
  name: string;
  icon?: any; // TODO: Change this type to something more specific
}

const Section: React.FC<SectionProps> = ({ name, icon, children }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          {icon}
          {name}
        </SectionTitle>
      </SectionHeader>
      {children}
    </SectionContainer>
  );
};

export default Section;
