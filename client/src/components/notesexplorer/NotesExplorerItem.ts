import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const NotesExplorerItemContainer = styled.li`
  display: flex;
  height: 34px;
  width: 100%;
  font-size: 12px;
  align-items: center;

  .markdown-icon {
    width: 20px;
    height: 20px;
    margin-right: 0.875em;
  }

  .folder-icon {
    width: 17px;
    height: 17px;
    margin-right: 0.875em;
  }

  .chevron-icon {
    width: 14px;
    height: 14px;
    margin-right: 1em;
  }

  .untitled {
    font-style: italic;
  }

  &.selected {
    background: ${(props) =>
      props.theme.sidebar.backgroundSecondary} !important;
  }

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.sidebar.hoverColor};
  }
`;

export const NotesExplorerLink = css`
  display: flex;
  align-items: center;
  height: inherit;
  width: inherit;
  padding: 0 1.5em;
  text-decoration: none;
  color: inherit;
`;
