/* Checklists Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

import { Route, Switch, useHistory } from "react-router-dom";

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

// Image and icon imports
import PlusIcon from "../icons/PlusIcon";
import FolderPlusIcon from "../icons/FolderPlusIcon";
import HelpIcon from "../icons/HelpIcon";
import SingleChecklistPage from "./SingleChecklistPage";

export interface ChecklistsPageProps {}

const ChecklistsPage: React.FC<ChecklistsPageProps> = () => {
  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  // Checklists Help Menu State
  const [showChecklistHelp, setShowChecklistHelp] = useState(false);
  const openChecklistHelp = () => {
    setShowChecklistHelp((prev) => !prev);
  };

  // Checklists State
  const checklistsState: Checklist[] = useSelector(
    (state: any) => state.checklistsState
  );

  /**
   * State for checklists filter text
   */
  const [ChecklistFilterText, setChecklistFilterText] = useState("");

  return (
    <Switch>
      <Route exact path="/checklists">
        <PageHeader
          title="Checklists"
          icon={<DocumentCheckIcon />}
          setFilterText={setChecklistFilterText}
        >
          <PageHeaderButton
            title={"New Checklist"}
            onClick={() => handleCreateChecklist(dispatch, history)}
          >
            <PlusIcon />
          </PageHeaderButton>
          <PageHeaderButton
            title="New Group"
            onClick={() => handleCreateGroup(dispatch)}
          >
            <FolderPlusIcon />
          </PageHeaderButton>
          <PageHeaderButton title={"Help"} onClick={openChecklistHelp}>
            <HelpIcon />
          </PageHeaderButton>
        </PageHeader>
        <div className="main-content-wrapper">
          <Section
            name="Groups"
            handleClick={() => handleCreateGroup(dispatch)}
          >
            <GroupList />
          </Section>
          <Section
            name="My Checklists"
            handleClick={() => handleCreateChecklist(dispatch, history)}
          >
            <ChecklistList ChecklistFilterText={ChecklistFilterText} />
          </Section>
        </div>
      </Route>
      {/** Routes for Editors */}
      {checklistsState.map((checklist) => (
        <Route key={checklist._id} path={`/checklists/${checklist._id}`}>
          <SingleChecklistPage activeChecklist={checklist} />
        </Route>
      ))}
    </Switch>
  );
};

export default ChecklistsPage;
