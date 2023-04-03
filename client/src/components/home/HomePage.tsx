/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Common imports
import PageHeader from "../pageheader/PageHeader";
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
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Home content renderer
 */
const HomePage: React.FC<HomePageProps> = ({ setSelectedTab }) => {
  // Data Saved State
  const [saved, setSaved] = useState(true);

  return (
    <React.Fragment>
      <PageHeader title="Dashboard" icon={<HomeIcon />} saved={saved} />
      <div className="main-content-wrapper">
        <Section name={`Favorited Groups`} icon={<StarIcon />}>
          <GroupList favorites={true} />
        </Section>
        <Section name={`Favorited Quicknotes`} icon={<StarIcon />}>
          <QNList favorites={true} setSaved={setSaved} />
        </Section>
        <Section name={`Favorited Marknotes`} icon={<StarIcon />}>
          <MNList favorites={true} setSelectedTab={setSelectedTab} />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
