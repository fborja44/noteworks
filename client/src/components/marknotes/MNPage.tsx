/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { useHistory } from "react-router-dom";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { handleCreateMarknote } from "../../utils/marknotes";
import { handleCreateGroup } from "../../utils/groups";

// Common imports
import { Marknote } from "../../common/types";

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
}

/**
 * Content for marknotes route
 */
const MNPage: React.FC<MNPageProps> = ({ explorerOpen, setExplorerOpen }) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  // Help menu state
  const [showMNHelp, setShowMNHelp] = useState(false);
  const openMNHelp = () => {
    setShowMNHelp((prev) => !prev);
  };

  // Marknotes State
  const marknotesState: Marknote[] = useSelector(
    (state: any) => state.marknotesState
  );

  /**
   * State for marknotes filter text
   */
  const [MNFilterText, setMNFilterText] = useState("");

  return (
    <Switch>
      <Route exact path="/marknotes">
        <PageHeader
          title="My Marknotes"
          setFilterText={!explorerOpen ? setMNFilterText : undefined}
          icon={<BsMarkdown className="markdown-icon" />}
        >
          {!explorerOpen && (
            <>
              <PageHeaderButton
                id="create-marknote-button"
                title="New Note"
                onClick={() => {
                  if (!currentUser) {
                    console.log("Error: Unauthorized action.");
                    return;
                  }
                  handleCreateMarknote(dispatch, history, currentUser);
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
            </>
          )}
          <PageHeaderButton
            id="toggle-list-view-button"
            title="List View"
            selected={explorerOpen}
            onClick={() => {
              setExplorerOpen(true);
            }}
          >
            <MenuIcon />
          </PageHeaderButton>
          <PageHeaderButton
            id="toggle-grid-view-button"
            title="Grid View"
            selected={!explorerOpen}
            onClick={() => {
              setExplorerOpen(false);
            }}
          >
            <SquareBlocksIcon />
          </PageHeaderButton>
          <PageHeaderButton id="help-button" title="Help" onClick={openMNHelp}>
            <HelpIcon />
          </PageHeaderButton>
        </PageHeader>
        <div className="main-content-wrapper">
          {!explorerOpen ? (
            <>
              <Section name="My Groups">
                <GroupList />
              </Section>
              <Section name="My Marknotes">
                <MNList MNFilterText={MNFilterText} />
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
      {marknotesState.map((note) => (
        <Route key={note._id} path={`/marknotes/${note._id}`}>
          <MNEditor activeNote={note} />
        </Route>
      ))}
      {/** Routes for Previews */}
      {marknotesState.map((note) => (
        <Route key={note._id} path={`/marknotes/${note._id}`}>
          <Preview currentNote={note} />
        </Route>
      ))}
    </Switch>
  );
};

export default MNPage;
