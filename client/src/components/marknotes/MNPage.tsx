/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Common imports
import { Group, Marknote } from "../../common/types";

// Component imports
import MNHelp from "./MNHelp";
import MNEditor from "./MNEditor";
import Preview from "./MNPreview";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import PageHeader from "../pageheader/PageHeader";
import Section, { Empty } from "../Section";
import MNList from "./MNList";
import GroupList from "../groups/GroupList";

// Image and icon impaorts
import PlusIcon from "../icons/PlusIcon";
import FolderPlusIcon from "../icons/FolderPlusIcon";
import HelpIcon from "../icons/HelpIcon";
import MenuIcon from "../icons/MenuIcon";
import SquareBlocksIcon from "../icons/SquareBlocksIcon";
import SparkleIcon from "../icons/SparkleIcon";
import { BsMarkdown } from "react-icons/bs";

/**
 * Props for MNPage
 */
export interface MNPageProps {
  explorerOpen: boolean;
  setExplorerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  marknotes: Marknote[];
  updateMarknotesList: Function;
  setMarknotes: React.Dispatch<React.SetStateAction<any[]>>;
  groups: Group[];
  updateGroupsList: Function;
  setGroups: React.Dispatch<React.SetStateAction<any[]>>;
  handleAddGroup: () => void;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleAddMarknote: () => void;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Content for marknotes route
 */
const MNPage: React.FC<MNPageProps> = ({
  explorerOpen,
  setExplorerOpen,
  marknotes,
  updateMarknotesList,
  setMarknotes,
  groups,
  updateGroupsList,
  setGroups,
  handleAddGroup,
  handleUpdateGroup,
  handleDeleteGroup,
  handleAddMarknote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // Help menu state
  const [showMNHelp, setShowMNHelp] = useState(false);
  const openMNHelp = () => {
    setShowMNHelp((prev) => !prev);
  };

  /**
   * State for marknotes filter text
   */
  const [MNFilterText, setMNFilterText] = useState("");

  return (
    <Switch>
      <Route exact path="/marknotes">
        <PageHeader
          title="My Marknotes"
          useFilter={!explorerOpen}
          setFilterText={setMNFilterText}
          icon={<BsMarkdown className="markdown-icon" />}
        >
          {!explorerOpen && (
            <>
              <PageHeaderButton title="New Note" onClick={handleAddMarknote}>
                <PlusIcon />
              </PageHeaderButton>
              <PageHeaderButton title="New Group" onClick={handleAddGroup}>
                <FolderPlusIcon />
              </PageHeaderButton>
            </>
          )}
          <PageHeaderButton
            title="List View"
            selected={explorerOpen}
            onClick={() => {
              setExplorerOpen(true);
            }}
          >
            <MenuIcon />
          </PageHeaderButton>
          <PageHeaderButton
            title="Grid View"
            selected={!explorerOpen}
            onClick={() => {
              setExplorerOpen(false);
            }}
          >
            <SquareBlocksIcon />
          </PageHeaderButton>
          <PageHeaderButton title="Help" onClick={openMNHelp}>
            <HelpIcon />
          </PageHeaderButton>
        </PageHeader>
        <div className="main-content-wrapper">
          {!explorerOpen ? (
            <>
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
                  MNFilterText={MNFilterText}
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
            </>
          ) : (
            <>
              <div
                css={css`
                  width: 100%;
                  height: 80%;
                  display: flex;
                  justify-content: center;
                  align-items: center;

                  svg {
                    width: 50px;
                    height: 50px;
                    margin-top: 1.5em;
                  }
                `}
              >
                <Empty>
                  <p>No Active Marknotes</p>
                  <SparkleIcon />
                </Empty>
              </div>
            </>
          )}
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
