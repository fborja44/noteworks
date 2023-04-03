/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

// Redux imports
import { useDispatch } from "react-redux";
import { handleCreateQuicknote } from "../../utils/quicknotes";
import { handleCreateGroup } from "../../utils/groups";

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

export interface QNPageProps {}

/**
 * Content for the quicknotes route.
 */
const QNPage: React.FC<QNPageProps> = () => {
  // Dispatch hook
  const dispatch = useDispatch();

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
        <PageHeaderButton
          title={"New Note"}
          onClick={() => handleCreateQuicknote(dispatch)}
        >
          <PlusIcon />
        </PageHeaderButton>
        <PageHeaderButton
          title="New Group"
          onClick={() => handleCreateGroup(dispatch)}
        >
          <FolderPlusIcon />
        </PageHeaderButton>
        <PageHeaderButton title={"Help"} onClick={openQNHelp}>
          <HelpIcon />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <Section name="Groups" handleClick={() => handleCreateGroup(dispatch)}>
          <GroupList />
        </Section>
        <Section
          name="My Quicknotes"
          handleClick={() => handleCreateQuicknote(dispatch)}
        >
          <QNList QNFilterText={QNFilterText} setSaved={setSaved} />
        </Section>
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QNPage;
