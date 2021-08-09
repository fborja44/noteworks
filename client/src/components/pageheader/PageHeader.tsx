/* Page Header Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";

// Common imports
import { Marknote } from "../../common/types";
import { findAltColor } from "../../common/color";

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
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  padding: 0 0 0 1rem;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);

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

    li {
      width: 40px;
      height: 78%;
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 80%;
        height: 100%;
        background: inherit;
        border: none;
        color: white;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        -webkit-user-select: none;
        border-radius: 3px;

        &:hover {
          cursor: pointer;
          background: ${(props) => props.theme.header.backgroundSecondary};
          transition: background-color 0.2s ease 0s;
        }
      }

      a {
        color: ${(props) => props.theme.header.textPrimary};
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &::visited {
          color: ${(props) => props.theme.header.textPrimary};
        }
      }
    }
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
      color2={color ? findAltColor(color) : appTheme.header.backgroundSecondary}
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
    height: 100%;
    width: fit-content;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    padding: 0 1rem 0 1rem;

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

interface EditorHeaderProps {
  currentNote: Marknote;
  handleEditField: (key: string, value: string | Boolean) => void;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  currentNote,
  handleEditField,
  children,
}) => {
  const color = currentNote.color;
  const color_alt = findAltColor(color);

  return (
    <PageHeaderContainer color={color} color2={color_alt}>
      <TitleInput
        type="text"
        placeholder="Enter a title..."
        value={currentNote.title}
        onChange={(event) => handleEditField("title", event.target.value)}
        color={color_alt}
      />
      <PageHeaderButtonsContainer>
        <ul>{children}</ul>
      </PageHeaderButtonsContainer>
    </PageHeaderContainer>
  );
};
