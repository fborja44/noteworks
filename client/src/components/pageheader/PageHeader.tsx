/* Page Header Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

// Common imports
import { Group, Marknote } from "../../common/types";
import { findDarkColor } from "../../common/color";

// Component imports
import Searchbar from "../Searchbar";

/**
 * Dynamic Element Styles
 * Issue: input is rerendered each time input is given, losing focus
 * Logic from this thread: https://github.com/emotion-js/emotion/issues/1797
 */
const PageHeaderColors = ({
  color,
  color2,
}: {
  color: string;
  color2: string;
}) =>
  css`
    background: ${color};
    button {
      background: ${color};
      &:hover {
        background: ${color2} !important;
      }
    }

    .selected {
      background: ${color2} !important;
    }
  `;
const PageHeaderContainer = styled.section`
  ${PageHeaderColors};
  color: ${(props) => props.theme.header.textPrimary};
  border-bottom: 1px solid ${(props) => props.theme.header.borderColor};
  height: 35px;
  width: calc(100vw - 100px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  padding: 0 0 0 1rem;

  h1 {
    margin-left: 1rem;
    font-size: 16px;
    margin: 0;
    position: relative;
    bottom: 1px;
    user-select: none;
  }
`;

const PageHeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const PageHeaderButtonsContainer = styled.div`
  height: inherit;
  user-select: none;

  ul {
    list-style: none;
    font-size: 20px;
    margin: 0;
    padding: 0;
    height: inherit;
    display: flex;
    align-items: center;
  }
`;

export interface PageHeaderProps {
  title: string;
  color?: string;
  useSearch?: boolean;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  useSearch,
  setSearchText,
  color,
  children,
}) => {
  const appTheme = useTheme();
  return (
    <PageHeaderContainer
      color={color ? color : appTheme.header.background}
      color2={
        color ? findDarkColor(color) : appTheme.header.backgroundSecondary
      }
    >
      <PageHeaderSection>
        <h1>{title}</h1>
      </PageHeaderSection>
      <PageHeaderSection>
        {useSearch && setSearchText && (
          <Searchbar handleSearchNote={setSearchText} />
        )}
        <PageHeaderButtonsContainer>
          <ul>{children}</ul>
        </PageHeaderButtonsContainer>
      </PageHeaderSection>
    </PageHeaderContainer>
  );
};

PageHeader.defaultProps = {
  useSearch: false,
};

export default PageHeader;

const TitleInputStyles = ({ color }: { color: string }) =>
  css`
    background: ${color};
    color: white;
    height: 75%;
    width: fit-content;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    padding: 0 0.5rem 0 0.7rem;

    &::placeholder {
      color: white;
    }

    &:focus {
      outline: none;
    }
  `;
const TitleInput = styled.input`
  ${TitleInputStyles}
`;

interface InputPageHeaderProps {
  item: Marknote | Group;
  handleEditField: (key: string, value: string | Boolean) => void;
}

export const InputPageHeader: React.FC<InputPageHeaderProps> = ({
  item,
  handleEditField,
  children,
}) => {
  const color = item.color;
  const color_alt = findDarkColor(color);

  return (
    <PageHeaderContainer color={color} color2={color_alt}>
      <TitleInput
        type="text"
        placeholder={
          item.type === "marknote" ? "Untitled Note" : "Untitled Group"
        }
        value={item.title}
        onChange={(event) => handleEditField("title", event.target.value)}
        color={color_alt}
      />
      <PageHeaderButtonsContainer>{children}</PageHeaderButtonsContainer>
    </PageHeaderContainer>
  );
};
