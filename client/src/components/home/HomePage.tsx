/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Common imports
import PageHeader from "../pageheader/PageHeader";
import { Quicknote, Marknote, Group } from "../../common/types";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Image and icon imports
import GroupList from "../groups/GroupList";
import StarIcon from "../icons/StarIcon";
import HomeIcon from "../icons/HomeIcon";

/**
 * Home content props
 */
export interface HomePageProps {
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Home content renderer
 */
const HomePage: React.FC<HomePageProps> = ({
  groups,
  updateGroupsList,
  handleUpdateGroup,
  handleDeleteGroup,
  setSelectedTab,
}) => {
  // Data Saved State
  const [saved, setSaved] = useState(true);

  return (
    <React.Fragment>
      <PageHeader title="Dashboard" icon={<HomeIcon />} saved={saved} />
      <div className="main-content-wrapper">
        <Section name={`Favorited Groups`} icon={<StarIcon />}>
          <GroupList
            groups={groups}
            updateGroupsList={updateGroupsList}
            favorites={true}
            handleUpdateGroup={handleUpdateGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        </Section>
        <Section name={`Favorited Quicknotes`} icon={<StarIcon />}>
          <QNList
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            favorites={true}
            setSaved={setSaved}
          />
        </Section>
        <Section name={`Favorited Marknotes`} icon={<StarIcon />}>
          <MNList
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            favorites={true}
            setSelectedTab={setSelectedTab}
          />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
