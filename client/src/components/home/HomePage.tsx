/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

import styled from "@emotion/styled";

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
  color: ${props => props.theme.title.textPrimary};
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
  height: 40px;
  width: 130px;
  outline: none;
  border: 0;
  font-size: 13px;
  padding: 0 1em;
  border-radius: 5px;
  margin-right: 1.5em;

  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.sidebar.backgroundSecondary};
    color: ${(props) => props.theme.sidebar.textSecondary};
  }

  &.blue {
    background: ${COLOR.blue.primary};
    color: white;

    &:hover {
      background: ${COLOR.blue.secondary};
      color: white;
    }
  }
`;

/**
 * Home content renderer
 */
const HomePage: React.FC = () => {
  // Data Saved State
  const [saved, setSaved] = useState(true);

  const currentUser = false;

  return (
    <React.Fragment>
      <PageHeader title="Dashboard" icon={<HomeIcon />} saved={saved} />
      <div className="main-content-wrapper">
        {currentUser ? (
          <>
            <Section name={`Favorited Groups`} icon={<StarIcon />}>
              <GroupList favorites={true} />
            </Section>
            <Section name={`Favorited Quicknotes`} icon={<StarIcon />}>
              <QNList favorites={true} setSaved={setSaved} />
            </Section>
            <Section name={`Favorited Marknotes`} icon={<StarIcon />}>
              <MNList favorites={true} />
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
              <HomePageButton>Sign In</HomePageButton>
              <HomePageButton className="blue">Create Account</HomePageButton>
            </ButtonsContainer>
          </Section>
        )}
      </div>
    </React.Fragment>
  );
};

export default HomePage;
