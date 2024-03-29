/* Page Header Component
------------------------------------------------------------------------------*/
// React import
import * as React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Checklist, Group, Marknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import Filterbar from "./Filterbar";
import { IoSaveOutline } from "react-icons/io5";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import DisconnectedAlert from "../alert/DisconnectedAlert";

const PageHeaderContainer = styled.section`
  color: ${(props) => props.theme.header.textPrimary};
  border-bottom: 1px solid ${(props) => props.theme.header.borderColor};
  height: 35px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
  padding: 0 0.5em 0 1em;

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

const PageHeaderIconStyles = css`
  height: 20px;
  width: 20px;
  margin-right: 0.625em;

  #icon-container {
    height: 20px;
    width: 20px;
    margin-right: 0.625em;
  }

  .markdown-icon {
    height: 20px;
    width: 20px;
  }
`;

const PageHeaderButtonsContainer = styled.div`
  height: inherit;
  user-select: none;
  display: flex;
  flex-direction: row;
  align-items: center;

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

const SavingIndicatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 1em;
  color: ${(props) => props.theme.header.textSecondary};
  svg {
    margin-right: 0.375em;
    width: 14px;
    height: 14px;
  }
  small#saving-text {
    font-size: 10px;
    font-style: italic;
    position: relative;
    bottom: 1px;
  }
`;

const TitleInput = styled.input`
  background: ${(props) => props.theme.header.backgroundSecondary};
  border: 1px solid ${(props) => props.theme.header.borderColor};
  color: white;
  height: 26px;
  width: fit-content;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  padding: 0 0.5rem 0 0.7rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    text-transform: capitalize;
  }
`;

const SavedIndicator = ({ saved }: { saved: boolean }) => {
  return !saved ? (
    <SavingIndicatorContainer className="blink">
      <IoSaveOutline />
      <small id="saving-text">saving...</small>
    </SavingIndicatorContainer>
  ) : (
    <SavingIndicatorContainer
      className="fade-out"
      css={css`
        color: ${COLOR.green.primary};
      `}
    >
      <CheckCircleIcon />
      <small id="saving-text">data saved</small>
    </SavingIndicatorContainer>
  );
};

export interface PageHeaderProps {
  title?: string;
  color?: string;
  icon?: React.ReactNode;
  saved?: boolean;
  setFilterText?: React.Dispatch<React.SetStateAction<string>>;
  item?: Marknote | Checklist | Group;
  handleEditField?: (key: string, value: string | Boolean) => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  color,
  icon,
  saved,
  setFilterText,
  children,
  handleEditField,
  item,
}) => {
  return (
    <>
      <PageHeaderContainer>
        <PageHeaderSection>
          {icon && (
            <span
              id="icon-container"
              css={[
                PageHeaderIconStyles,
                css`
                  color: ${!item ? color : COLOR[item.color].primary};
                `,
              ]}
            >
              {icon}
            </span>
          )}
          {item && handleEditField ? (
            <TitleInput
              type="text"
              placeholder={`Untitled ${item.type}`}
              value={item.title}
              onChange={(event) => handleEditField("title", event.target.value)}
            />
          ) : (
            <h1>{title}</h1>
          )}
        </PageHeaderSection>
        <PageHeaderSection>
          {saved !== undefined && <SavedIndicator saved={saved} />}
          {setFilterText && <Filterbar handleFilterNote={setFilterText} />}
          <PageHeaderButtonsContainer>
            <ul>{children}</ul>
          </PageHeaderButtonsContainer>
        </PageHeaderSection>
      </PageHeaderContainer>
      {<DisconnectedAlert />}
    </>
  );
};

export default PageHeader;
