/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Image and icon imports
import GroupList from "../groups/GroupList";
import StarIcon from "../icons/StarIcon";
import FolderIcon from "../icons/FolderIcon";
import BoltIcon from "../icons/BoltIcon";
import { BsMarkdown } from "react-icons/bs";

interface FavoritesPageProps {}

/**
 * Home content renderer
 */
const FavoritesPage: React.FC<FavoritesPageProps> = () => {
  // Data Saved State
  const [saved, setSaved] = useState(true);

  return (
    <React.Fragment>
      <PageHeader title="My Favorites" icon={<StarIcon />} saved={saved} />
      <div className="main-content-wrapper">
        <Section name={`Favorited Groups`} icon={<FolderIcon />}>
          <GroupList favorites={true} />
        </Section>
        <Section name={`Favorited Quicknotes`} icon={<BoltIcon />}>
          <QNList favorites={true} setSaved={setSaved} />
        </Section>
        <Section name={`Favorited Marknotes`} icon={<BsMarkdown />}>
          <MNList favorites={true} />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default FavoritesPage;
