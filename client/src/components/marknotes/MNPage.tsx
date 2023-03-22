/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

// Common imports
import { Group, Marknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import MNHelp from "./MNHelp";
import MNEditor from "./MNEditor";
import Preview from "./MNPreview";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import MNList from "./MNList";
import GroupList from "../groups/GroupList";

// Image and icon impaorts
import { RiAddLine } from "react-icons/ri";
import { MdCreateNewFolder, MdHelpOutline } from "react-icons/md";

import axios from "axios";

const BASE_ADDR = "http://localhost:3001";

/**
 * Props for MNPage
 */
export interface MNPageProps {
  marknotes: Marknote[];
  updateMarknotesList: Function;
  setMarknotes: React.Dispatch<React.SetStateAction<any[]>>;
  groups: Group[];
  updateGroupsList: Function;
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  handleAddGroup: () => void;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Content for marknotes route
 */
const MNPage: React.FC<MNPageProps> = ({
  marknotes,
  updateMarknotesList,
  setMarknotes,
  groups,
  updateGroupsList,
  setGroups,
  handleAddGroup,
  handleUpdateGroup,
  handleDeleteGroup,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // History
  const history = useHistory();

  /**
   * Marknote function to add a new empty marknote to the list
   */
  const handleAddMarknote = async () => {
    // Add new to state list
    try {
      const { data: newMarknote } = await axios({
        baseURL: BASE_ADDR,
        url: "/marknotes",
        method: "POST",
        data: {
          title: "",
          color: COLOR.GREY_DARK,
          body: "",
        },
      });
      setMarknotes([...marknotes, newMarknote]);
      // Redirect when new note is added
      history.push("/marknotes");
      history.push(`/marknotes/${newMarknote._id}`);
    } catch (e) {
      console.log(e);
    }
  };

  // Help menu state
  const [showMNHelp, setShowMNHelp] = useState(false);
  const openMNHelp = () => {
    setShowMNHelp((prev) => !prev);
  };

  /**
   * State for marknotes search text
   */
  const [MNSearchText, setMNSearchText] = useState("");

  return (
    <Switch>
      <Route exact path="/marknotes">
        <PageHeader
          title="My Marknotes"
          useSearch={true}
          setSearchText={setMNSearchText}
        >
          <PageHeaderButton title="New Note" onClick={handleAddMarknote}>
            <RiAddLine />
          </PageHeaderButton>
          <PageHeaderButton title="New Group" onClick={handleAddGroup}>
            <MdCreateNewFolder />
          </PageHeaderButton>
          <PageHeaderButton title="Help" onClick={openMNHelp}>
            <MdHelpOutline />
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
          <Section name="My Marknotes" handleClick={handleAddMarknote}>
            <MNList
              MNSearchText={MNSearchText}
              marknotes={marknotes}
              updateMarknotesList={updateMarknotesList}
              groups={groups}
              updateGroupsList={updateGroupsList}
              handleUpdateGroup={handleUpdateGroup}
              handleUpdateMarknote={handleUpdateMarknote}
              handleDeleteMarknote={handleDeleteMarknote}
              setSelectedTab={setSelectedTab}
            />
          </Section>
        </div>
        <MNHelp showMNHelp={showMNHelp} setShowMNHelp={setShowMNHelp} />
      </Route>
      {/** Routes for Editors */}
      {marknotes.map((note) => (
        <Route key={note._id} path={`/marknotes/${note._id}`}>
          <MNEditor
            currentNote={note}
            updateMarknotesList={updateMarknotesList}
            handleDeleteMarknote={handleDeleteMarknote}
            handleUpdateMarknote={handleUpdateMarknote}
          />
        </Route>
      ))}
      {/** Routes for Previews */}
      {marknotes.map((note) => (
        <Route key={note._id} path={`/marknotes/${note._id}`}>
          <Preview currentNote={note} />
        </Route>
      ))}
    </Switch>
  );
};

export default MNPage;
