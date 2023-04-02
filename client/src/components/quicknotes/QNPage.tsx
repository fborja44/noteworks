/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

// Common imports
import { Group } from "../../common/types";

// Component imports
import QNHelp from "./QNHelp";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import QNList from "./QNList";
import GroupList from "../groups/GroupList";

// Image and icon imports
import PlusIcon from "../icons/PlusIcon";
import FolderPlusIcon from "../icons/FolderPlusIcon";
import HelpIcon from "../icons/HelpIcon";
import BoltIcon from "../icons/BoltIcon";

import { handleAddQuicknote } from "../../utils/quicknotes";

export interface QNPageProps {
  groups: Group[];
  updateGroupsList: Function;
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  handleAddGroup: () => void;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
}

/**
 * Content for the quicknotes route.
 */
const QNPage: React.FC<QNPageProps> = ({
  groups,
  updateGroupsList,
  setGroups,
  handleAddGroup,
  handleUpdateGroup,
  handleDeleteGroup,
}) => {
  // Quicknotes Help Menu State
  const [showQNHelp, setShowQNHelp] = useState(false);
  const openQNHelp = () => {
    setShowQNHelp((prev) => !prev);
  };

  // Quicknotes Saved State
  const [saved, setSaved] = useState(true);

  /**
   * State for quicknotes filter text
   */
  const [QNFilterText, setQNFilterText] = useState("");

  useEffect(() => {
    setSaved(true);
  }, [QNFilterText]);

  return (
    <React.Fragment>
      <PageHeader
        title="My Quicknotes"
        useFilter={true}
        setFilterText={setQNFilterText}
        icon={<BoltIcon />}
        saved={saved}
      >
        <PageHeaderButton title={"New Note"} onClick={handleAddQuicknote}>
          <PlusIcon />
        </PageHeaderButton>
        <PageHeaderButton title="New Group" onClick={handleAddGroup}>
          <FolderPlusIcon />
        </PageHeaderButton>
        <PageHeaderButton title={"Help"} onClick={openQNHelp}>
          <HelpIcon />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <Section name="Groups" handleClick={handleAddGroup}>
          <GroupList
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        </Section>
        <Section name="My Quicknotes" handleClick={handleAddQuicknote}>
          <QNList
            QNFilterText={QNFilterText}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            setSaved={setSaved}
          />
        </Section>
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QNPage;
