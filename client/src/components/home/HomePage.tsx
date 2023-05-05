/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Redux imports
import { useSelector } from "react-redux";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

// Common imports
import { COLOR } from "../../common/color";
import { Checklist, Marknote, Quicknote } from "../../common/types";

// Component imports
import Avatar from "../avatar/Avatar";
import PageHeader from "../pageheader/PageHeader";
import HomeItem from "./HomeItem";
import Section from "../Section";

// Image and icon imports
import HomeIcon from "../icons/HomeIcon";
import GlobeIcon from "../icons/GlobeIcon";
import BoltIcon from "../icons/BoltIcon";
import DocumentCheckIcon from "../icons/DocumentCheckIcon";
import { BsMarkdown } from "react-icons/bs";

const TitleContainer = styled.div`
  color: ${(props) => props.theme.title.textPrimary};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  border-bottom: 1px solid ${(props) => props.theme.main.backgroundSecondary};
  svg {
    width: 34px;
    height: 34px;
    color: ${COLOR.blue.primary};
    margin-right: 0.6rem;
  }
  padding-bottom: 0.75em;
`;

const Title = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  align-items: center;
  margin-left: 0.625em;
  font-size: 24px;
  -webkit-app-region: drag;
  -webkit-user-select: none;
`;

const Content = styled.p`
  width: 45em;
`;

const ButtonsContainer = styled.div`
  margin-top: 2em;
`;

const HomePageButton = styled.button`
  background: ${(props) => props.theme.title.backgroundSecondary};
  color: ${(props) => props.theme.title.textSecondary};
  height: 38px;
  min-width: 100px;
  outline: none;
  border: 0;
  font-size: 13px;
  padding: 0 1.25em;
  border-radius: 5px;
  margin-right: 1.5em;

  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.sidebar.backgroundSecondary};
    color: ${(props) => props.theme.sidebar.textSecondary};
  }

  &.create-account {
    background: ${COLOR.blue.primary};
    color: white;

    &:hover {
      background: ${COLOR.blue.secondary};
      color: white;
    }
  }
`;

interface HomePageProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Home content renderer
 */
const HomePage: React.FC<HomePageProps> = ({
  setOpenLogin,
  setOpenCreateAccount,
}) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Quicknotes State
  const quicknotesState: Quicknote[] = useSelector(
    (state: any) => state.quicknotesState
  );

  // Marknotes State
  const marknotesState: Marknote[] = useSelector(
    (state: any) => state.marknotesState
  );

  // Checklists State
  const checklistsState: Checklist[] = useSelector(
    (state: any) => state.checklistsState
  );

  return (
    <React.Fragment>
      <PageHeader title="Dashboard" icon={<HomeIcon />} />
      <div className="main-content-wrapper">
        {currentUser ? (
          <>
            <Section full={false}>
              <TitleContainer>
                <Avatar currentUser={currentUser} size={30} />
                <Title>Your Notebook</Title>
              </TitleContainer>
              <HomeItem
                type="quicknotes"
                icon={<BoltIcon />}
                count={quicknotesState.length}
              />
              <HomeItem
                type="marknotes"
                icon={<BsMarkdown />}
                count={marknotesState.length}
                list={marknotesState}
              />

              <HomeItem
                type="checklists"
                icon={<DocumentCheckIcon />}
                count={checklistsState.length}
                list={checklistsState}
              />
            </Section>
          </>
        ) : (
          <Section>
            <TitleContainer>
              <GlobeIcon />
              <Title>NotesNexus</Title>
            </TitleContainer>
            <Content>
              NotesNexus is a note taking application with the goal of giving
              you the tools you need to quickly jot down those on-the-spot
              ideas, record in-depth and formatted notes, or reminders of what
              you need to do to stay on track.
            </Content>
            <Content>
              To get started now, log in, or create a new account!
            </Content>
            <ButtonsContainer>
              <HomePageButton onClick={() => setOpenLogin(true)}>
                Sign In
              </HomePageButton>
              <HomePageButton
                onClick={() => setOpenCreateAccount(true)}
                className="create-account"
              >
                Create Account
              </HomePageButton>
            </ButtonsContainer>
          </Section>
        )}
      </div>
    </React.Fragment>
  );
};

export default HomePage;
