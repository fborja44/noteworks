/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

// Redux imports
import { useDispatch } from "react-redux";
import { handleCreateQuicknote } from "../../utils/quicknotes";
import { handleCreateGroup } from "../../utils/groups";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

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
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

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
        setFilterText={setQNFilterText}
        icon={<BoltIcon />}
        saved={saved}
      >
        <PageHeaderButton
          id="create-quicknote-button"
          title={"New Note"}
          onClick={() => {
            if (!currentUser) {
              console.log("Error: Unauthorized action.");
              return;
            }
            handleCreateQuicknote(dispatch, currentUser);
          }}
        >
          <PlusIcon />
        </PageHeaderButton>
        <PageHeaderButton
          id="create-group-button"
          title="New Group"
          onClick={() => {
            if (!currentUser) {
              console.log("Error: Unauthorized action.");
              return;
            }
            handleCreateGroup(dispatch, currentUser);
          }}
        >
          <FolderPlusIcon />
        </PageHeaderButton>
        <PageHeaderButton id="help-button" title={"Help"} onClick={openQNHelp}>
          <HelpIcon />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <Section name="Groups">
          <GroupList />
        </Section>
        <Section name="My Quicknotes">
          <QNList QNFilterText={QNFilterText} setSaved={setSaved} />
        </Section>
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QNPage;
