/* Quicknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

// Common imports
import { Group, Quicknote } from "../../common/types";
import { COLOR } from "../../common/color";

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

import axios from "axios";

const BASE_ADDR = "http://localhost:3001";

export interface QNPageProps {
  quicknotes: Quicknote[];
  setQuicknotes: React.Dispatch<React.SetStateAction<any[]>>;
  updateQuicknotesList: Function;
  groups: Group[];
  updateGroupsList: Function;
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  handleAddGroup: () => void;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleUpdateQuicknote: (noteId: string, updatedQuicknote: Quicknote) => void;
  handleDeleteQuicknote: (noteId: string) => void;
}

/**
 * Content for the quicknotes route.
 */
const QNPage: React.FC<QNPageProps> = ({
  quicknotes,
  setQuicknotes,
  groups,
  updateGroupsList,
  setGroups,
  updateQuicknotesList,
  handleAddGroup,
  handleUpdateGroup,
  handleDeleteGroup,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
}) => {
  // Quicknotes Help Menu state
  const [showQNHelp, setShowQNHelp] = useState(false);
  const openQNHelp = () => {
    setShowQNHelp((prev) => !prev);
  };

  /**
   * Function to add new empty quicknote after add quicknote button is pressed.
   * Color is the id of the note color.
   */
  const handleAddQuicknote = async () => {
    try {
      const { data: newQuicknote } = await axios({
        baseURL: BASE_ADDR,
        url: "/quicknotes",
        method: "POST",
        data: {
          title: "",
          color: COLOR.yellow.id,
          body: "",
        },
      });
      setQuicknotes([...quicknotes, newQuicknote]);
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * State for quicknotes search text
   */
  const [QNSearchText, setQNSearchText] = useState("");

  return (
    <React.Fragment>
      <PageHeader
        title="My Quicknotes"
        useSearch={true}
        setSearchText={setQNSearchText}
        icon={<BoltIcon />}
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
            QNSearchText={QNSearchText}
            quicknotes={quicknotes}
            updateQuicknotesList={updateQuicknotesList}
            groups={groups}
            updateGroupsList={updateGroupsList}
            handleUpdateGroup={handleUpdateGroup}
            handleUpdateQuicknote={handleUpdateQuicknote}
            handleDeleteQuicknote={handleDeleteQuicknote}
          />
        </Section>
        <QNHelp showQNHelp={showQNHelp} setShowQNHelp={setShowQNHelp} />
      </div>
    </React.Fragment>
  );
};

export default QNPage;
