/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

import styled from "@emotion/styled";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Image and icon imports
import GroupList from "../groups/GroupList";
import StarIcon from "../icons/StarIcon";
import HomeIcon from "../icons/HomeIcon";
import GlobeIcon from "../icons/GlobeIcon";

const TitleContainer = styled.div`
  color: ${(props) => props.theme.title.textPrimary};
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  svg {
    width: 34px;
    height: 34px;
    color: ${COLOR.blue.primary};
  }
`;

const Title = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  margin-left: 0.6rem;
  align-items: center;
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

  return (
    <React.Fragment>
      <PageHeader title="Dashboard" icon={<HomeIcon />} />
      <div className="main-content-wrapper">
        {currentUser ? (
          <></>
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
