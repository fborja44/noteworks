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
import { RiAddLine } from "react-icons/ri";
import { MdCreateNewFolder, MdHelpOutline } from "react-icons/md";

import axios from "axios";

const BASE_ADDR = "http://localhost:3001";

export interface QNPageProps {
  quicknotes: Quicknote[];
  setQuicknotes: React.Dispatch<React.SetStateAction<any[]>>;
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  handleAddGroup: () => void;
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleUpdateQuicknote: (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => void;
  handleDeleteQuicknote: (noteId: string) => void;
}

/**
 * Content for the quicknotes route.
 */
const QNPage: React.FC<QNPageProps> = ({
  quicknotes,
  setQuicknotes,
  groups,
  setGroups,
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
   * Function to add new empty quicknote after add quicknote button is pressed
   */
  const handleAddQuicknote = async () => {
    try {
      const { data: newQuicknote } = await axios({
        baseURL: BASE_ADDR,
        url: "/quicknotes",
        method: "POST",
        data: {
          title: "",
          color: COLOR.GREY_DARK,
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
        title="Quicknotes"
        useSearch={true}
        setSearchText={setQNSearchText}
      >
        <PageHeaderButton title={"New Note"} onClick={handleAddQuicknote}>
          <RiAddLine />
        </PageHeaderButton>
        <PageHeaderButton title="New Group" onClick={handleAddGroup}>
          <MdCreateNewFolder />
        </PageHeaderButton>
        <PageHeaderButton title={"Help"} onClick={openQNHelp}>
          <MdHelpOutline />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <Section name="Groups" handleClick={handleAddGroup}>
          <GroupList
            groups={groups}
            handleUpdateGroup={handleUpdateGroup}
            handleDeleteGroup={handleDeleteGroup}
          />
        </Section>
        <Section name="My Quicknotes" handleClick={handleAddQuicknote}>
          <QNList
            QNSearchText={QNSearchText}
            quicknotes={quicknotes}
            groups={groups}
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
