/* Page Header Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

import styled from "@emotion/styled";
import { css } from "@emotion/react";

// Common imports
import { Marknote } from "../../common/types";
import { findAltColor } from "../../common/color";

// Component imports
import Searchbar from "../Searchbar";

export interface PageHeaderProps {
  title: string;
  useSearch?: boolean;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
}

const SubHeaderContainer = styled.section`
  background: var(--sub-header-background-primary);
  color: var(--sub-header-text-color-primary);
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: -5;
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

const SubHeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const SubHeaderButtonsContainer = styled.div`
  height: inherit;
  user-select: none;

  ul {
    list-style: none;
    font-size: 20px;
    margin: 0;
    padding: 0;
    height: inherit;

    li {
      width: 40px;
      height: 100%;
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;

      button {
        width: 100%;
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

        &:hover {
          cursor: pointer;
          background: var(--sub-header-background-hover);
          transition: background-color 0.2s ease 0s;
        }
      }

      a {
        color: var(--sub-header-text-color-primary);
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        &::visited {
          color: var(--sub-header-text-color-primary);
        }
      }
    }
  }
`;

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  useSearch,
  setSearchText,
  children,
}) => {
  return (
    <SubHeaderContainer>
      <SubHeaderSection>
        <h1>{title}</h1>
      </SubHeaderSection>
      <SubHeaderSection>
        {useSearch && setSearchText && (
          <Searchbar handleSearchNote={setSearchText} />
        )}
        <SubHeaderButtonsContainer>
          <ul>{children}</ul>
        </SubHeaderButtonsContainer>
      </SubHeaderSection>
    </SubHeaderContainer>
  );
};

PageHeader.defaultProps = {
  useSearch: false,
};

export default PageHeader;

/**
 * Dynamic Element Styles
 * Should declare outside of function component, but need to declare here for dynamic styles
 * Issue: input is rerendered each time input is given, losing focus
 * Logic from this thread: https://github.com/emotion-js/emotion/issues/1797
 */
const EditorHeaderContainerStyles = ({
  color,
  color2,
}: {
  color: string;
  color2: string;
}) =>
  css`
    background: ${color};
    color: var(--sub-header-text-color-primary);
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: -5;
    padding: 0 0 0 1rem;

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
const EditorHeaderContainer = styled.section`
  ${EditorHeaderContainerStyles}
`;

const TitleInputStyles = ({ color }: { color: string }) =>
  css`
    background: ${color};
    color: white;
    height: 24px;
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
    <EditorHeaderContainer color={color} color2={color_alt}>
      <TitleInput
        type="text"
        placeholder="Enter a title..."
        value={currentNote.title}
        onChange={(event) => handleEditField("title", event.target.value)}
        color={color_alt}
      />
      <SubHeaderButtonsContainer>
        <ul>{children}</ul>
      </SubHeaderButtonsContainer>
    </EditorHeaderContainer>
  );
};
