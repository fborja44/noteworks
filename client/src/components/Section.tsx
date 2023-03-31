/* Section Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

import styled from "@emotion/styled";

export const SectionContainer = styled.section`
  margin-bottom: 2em;
  color: ${(props) => props.theme.main.textSecondary};
  font-size: 14px;
`;

export const SectionHeader = styled.div`
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.main.textPrimary};
`;

export const SectionTitle = styled.h1`
  margin: 0 0 0.5em 0;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  user-select: none;
  svg {
    margin-right: 0.75em;
    height: 16px;
    width: 16px;
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
  color: ${(props) => props.theme.main.textSecondary};
  font-weight: 500;
  width: 100%;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
  font-size: 13px;

  p {
    margin: 0.5rem;
  }

  svg {
    position: relative;
    top: 2px;
    margin: 0 0.2em;
    height: 16px;
    width: 16px;
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
        {/* {handleClick ? (
          <SectionHeaderButton onClick={handleClick}>
            <RiAddLine />
          </SectionHeaderButton>
        ) : null} */}
      </SectionHeader>
      {children}
    </SectionContainer>
  );
};

export default Section;
