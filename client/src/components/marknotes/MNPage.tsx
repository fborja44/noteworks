/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

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

/**
 * Props for MNPage
 */
export interface MNPageProps {
  marknotes: Marknote[];
  setMarknotes: React.Dispatch<React.SetStateAction<any[]>>;
  groups: Group[];
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  handleAddGroup: () => void;
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  handleUpdateMarknote: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Content for marknotes route
 */
const MNPage: React.FC<MNPageProps> = ({
  marknotes,
  setMarknotes,
  groups,
  setGroups,
  handleAddGroup,
  handleUpdateGroup,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // History
  const history = useHistory();

  /**
   * Marknote function to add a new empty marknote to the list
   */
  const handleAddMarknote = () => {
    // Add new to state list
    const newMarknote: Marknote = {
      type: "marknote",
      id: nanoid(),
      title: "",
      body: "",
      lastModified: Date.now(),
      color: COLOR.GREY_DARK,
      favorited: false,
    };

    setMarknotes([...marknotes, newMarknote]);

    // Redirect when new note is added
    history.push("/marknotes");
    history.push(`/marknotes/${newMarknote.id}`);
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
          title="Marknotes"
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
            <GroupList groups={groups} handleUpdateGroup={handleUpdateGroup} />
          </Section>
          <Section name="My Marknotes" handleClick={handleAddMarknote}>
            <MNList
              MNSearchText={MNSearchText}
              marknotes={marknotes}
              groups={groups}
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
        <Route key={note.id} path={`/marknotes/${note.id}`}>
          <MNEditor
            currentNote={note}
            handleDeleteMarknote={handleDeleteMarknote}
            handleUpdateMarknote={handleUpdateMarknote}
          />
        </Route>
      ))}
      {/** Routes for Previews */}
      {marknotes.map((note) => (
        <Route key={note.id} path={`/marknotes/${note.id}`}>
          <Preview currentNote={note} />
        </Route>
      ))}
    </Switch>
  );
};

export default MNPage;
