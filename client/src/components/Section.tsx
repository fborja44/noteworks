/* Section Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

import styled from "@emotion/styled";

// Image and icon imports
import { RiAddLine } from "react-icons/ri";

export const SectionContainer = styled.section`
  margin-bottom: 2em;
`;

export const SectionHeader = styled.div`
  border-bottom: solid 1px #5f5f5f;
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.main.textPrimary};
`;

export const SectionTitle = styled.h1`
  margin: 0 0 0.5em 0;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
  user-select: none;
  * {
    margin-right: 0.2em;
  }
`;

export const SectionHeaderButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${(props) => props.theme.main.textPrimary};
  border-radius: 5px;
  height: 1.5em;

  &:hover {
    background: #ededed;
    transition: background 0.2s ease;
  }
`;

export const Empty = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: italic;
  text-align: center;
  user-select: none;

  p {
    margin: 0.5rem;
  }

  svg {
    position: relative;
    top: 3px;
    margin: 0 0.2em;
  }
`;

export interface SectionProps {
  name: string;
  icon?: any; // TODO: Change this type to something more specific
  handleClick?: any;
}

const Section: React.FC<SectionProps> = ({
  name,
  icon,
  handleClick,
  children,
}) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          {icon}
          {name}
        </SectionTitle>
        {handleClick ? (
          <SectionHeaderButton onClick={handleClick}>
            <RiAddLine />
          </SectionHeaderButton>
        ) : null}
      </SectionHeader>
      {children}
    </SectionContainer>
  );
};

export default Section;
