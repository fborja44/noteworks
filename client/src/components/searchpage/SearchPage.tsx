/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Common imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Redux imports
import { useSelector } from "react-redux";

// Image and icon imports
import GroupList from "../groups/GroupList";
import MagnifyingGlassIcon from "../icons/MagnifyingGlassIcon";
import { AppState } from "../../redux/reducers/rootReducer";

/**
 * Search content renderer
 */
const SearchPage: React.FC = () => {
  // Data Saved State
  const [saved, setSaved] = useState(true);

  // Search Term State
  const searchTerm = useSelector((state: AppState) => state.searchState);

  return (
    <React.Fragment>
      <PageHeader
        title={`Search Results for "${searchTerm}"`}
        icon={<MagnifyingGlassIcon />}
        saved={saved}
      />
      <div className="main-content-wrapper">
        <Section name={`Groups`}>
          <GroupList GroupsFilterText={searchTerm} />
        </Section>
        <Section name={`Quicknotes`}>
          <QNList QNFilterText={searchTerm} setSaved={setSaved} />
        </Section>
        <Section name={`Marknotes`}>
          <MNList MNFilterText={searchTerm} />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
