/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Common imports
import PageHeader from "../pageheader/PageHeader";
import { Quicknote, Marknote, Group } from "../../common/types";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Image and icon imports
import { TiStar } from "react-icons/ti";
import GroupList from "../groups/GroupList";

/**
 * Home content props
 */
export interface HomePageProps {
  groups: Group[];
  quicknotes: Quicknote[];
  marknotes: Marknote[];
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleUpdateQuicknote: (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => void;
  handleDeleteQuicknote: (noteId: string) => void;
  handleUpdateMarknote: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Home content renderer
 */
const HomePage: React.FC<HomePageProps> = ({
  groups,
  quicknotes,
  marknotes,
  handleUpdateGroup,
  handleDeleteGroup,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  return (
    <React.Fragment>
      <PageHeader title="Home" />
      <div className="main-content-wrapper">
        <Section name={`Favorited Groups`} icon={<TiStar />}>
          <GroupList
            groups={groups}
            favorites={true}
            handleUpdateGroup={handleUpdateGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        </Section>
        <Section name={`Favorited Quicknotes`} icon={<TiStar />}>
          <QNList
            quicknotes={quicknotes}
            groups={groups}
            handleUpdateGroup={handleUpdateGroup}
            favorites={true}
            handleUpdateQuicknote={handleUpdateQuicknote}
            handleDeleteQuicknote={handleDeleteQuicknote}
          />
        </Section>
        <Section name={`Favorited Marknotes`} icon={<TiStar />}>
          <MNList
            marknotes={marknotes}
            groups={groups}
            handleUpdateGroup={handleUpdateGroup}
            favorites={true}
            handleUpdateMarknote={handleUpdateMarknote}
            handleDeleteMarknote={handleDeleteMarknote}
            setSelectedTab={setSelectedTab}
          />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
