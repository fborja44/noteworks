/* Checklists Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

import { Route, Switch } from "react-router-dom";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { handleCreateChecklist } from "../../utils/checklists";
import { handleCreateGroup } from "../../utils/groups";

// Common imports
import { Checklist } from "../../common/types";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import DocumentCheckIcon from "../icons/DocumentCheckIcon";
import GroupList from "../groups/GroupList";
import ChecklistList from "./ChecklistsList";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import ChecklistsHelp from "./ChecklistsHelp";

// Image and icon imports
import PlusIcon from "../icons/PlusIcon";
import FolderPlusIcon from "../icons/FolderPlusIcon";
import HelpIcon from "../icons/HelpIcon";
import SingleChecklistPage from "./SingleChecklistPage";
import { AppState } from "../../redux/reducers/rootReducer";

export interface ChecklistsPageProps {}

const ChecklistsPage: React.FC<ChecklistsPageProps> = () => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // Checklists State
  const checklistsState: Checklist[] = useSelector(
    (state: AppState) => state.checklistsState
  );

  /**
   * State for checklists filter text
   */
  const [ChecklistFilterText, setChecklistFilterText] = useState("");

  // Help menu state
  const [showChecklistsHelp, setShowChecklistsHelp] = useState(false);
  const openChecklistsHelp = () => {
    setShowChecklistsHelp((prev) => !prev);
  };

  return (
    <Switch>
      <Route exact path="/checklists">
        <PageHeader
          title="Checklists"
          icon={<DocumentCheckIcon />}
          setFilterText={setChecklistFilterText}
        >
          <PageHeaderButton
            id="create-checklist-button"
            title={"New Checklist"}
            onClick={() => {
              if (!currentUser) {
                console.log("Error: Unauthorized action.");
                return;
              }
              handleCreateChecklist(dispatch, currentUser);
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
          <PageHeaderButton
            id="help-button"
            title={"Help"}
            onClick={openChecklistsHelp}
          >
            <HelpIcon />
          </PageHeaderButton>
        </PageHeader>
        <div className="main-content-wrapper">
          <Section
            name="My Groups"
            handleClick={() => {
              if (!currentUser) {
                console.log("Error: Unauthorized action.");
                return;
              }
              handleCreateGroup(dispatch, currentUser);
            }}
          >
            <GroupList />
          </Section>
          <Section
            name="My Checklists"
            handleClick={() => {
              if (!currentUser) {
                console.log("Error: Unauthorized action.");
                return;
              }
              handleCreateChecklist(dispatch, currentUser);
            }}
          >
            <ChecklistList ChecklistFilterText={ChecklistFilterText} />
          </Section>
          <ChecklistsHelp
            showChecklistsHelp={showChecklistsHelp}
            setShowChecklistsHelp={setShowChecklistsHelp}
          />
        </div>
      </Route>
      {/** Routes for Single Checklist Pages */}
      {checklistsState.map((checklist) => (
        <Route key={checklist._id} path={`/checklists/${checklist._id}`}>
          <SingleChecklistPage activeChecklist={checklist} />
        </Route>
      ))}
    </Switch>
  );
};

export default ChecklistsPage;
