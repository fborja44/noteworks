/* Individual Group Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

// Redux state
import { useSelector, useDispatch } from "react-redux";
import { handleUpdateGroup } from "../../utils/groups";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";
import { ColorId } from "../../common/color";

// Component imports
import PageHeaderButton from "../pageheader/PageHeaderButton";
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import ColorMenu from "../menus/ColorMenu";
import MNList from "../marknotes/MNList";
import QNList from "../quicknotes/QNList";

// Image and icon imports
import TrashIcon from "../icons/TrashIcon";
import PencilSquareIcon from "../icons/PencilSquareIcon";
import StarIcon from "../icons/StarIcon";
import ArrowUturnRightIcon from "../icons/ArrowUturnRightIcon";
import FolderOpenIcon from "../icons/FolderOpenIcon";
import ChecklistList from "../checklists/ChecklistsList";

/**
 * Props for GroupPage
 */
export interface GroupPageProps {
  currentGroup: Group;
}

/**
 * Group page component
 */
const GroupPage: React.FC<GroupPageProps> = ({ currentGroup }) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  // Quicknotes State
  const quicknotesState: Quicknote[] = useSelector(
    (state: any) => state.quicknotesState
  );

  // Marknotes State
  const marknotesState: Marknote[] = useSelector(
    (state: any) => state.marknotesState
  );

  // Filtertext State
  const [filterText, setFilterText] = useState("");

  /**
   * State for current group info
   */
  const [activeGroup, setActiveGroup] = useState(currentGroup);

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  // Data Saved State
  const [saved, setSaved] = useState(true);

  /**
   * Function to handle changes in a group's field.
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the group's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: any,
    updateDate: Boolean = true
  ) => {
    let updatedGroup;
    if (updateDate) {
      updatedGroup = {
        ...activeGroup,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedGroup = {
        ...activeGroup,
        [key]: value,
      };
    }
    setActiveGroup(updatedGroup);
  };

  /**
   * Function to toggle whether a group is favorited
   * Does NOT change the last modified date.
   */
  const handleFavorite = () => {
    if (!currentUser || currentUser.uid !== activeGroup.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedGroup = {
      ...activeGroup,
      favorited: !activeGroup.favorited,
    };
    handleUpdateGroup(dispatch, updatedGroup, currentUser);
  };

  /**
   * Function to handle a change in the group's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    if (!currentUser || currentUser.uid !== activeGroup.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedGroup: Group = {
      ...activeGroup,
      color: color,
    };
    handleUpdateGroup(dispatch, updatedGroup, currentUser);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Group Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  useEffect(() => {
    if (!currentUser || currentUser.uid !== activeGroup.author_id) return;
    const delayDBUpdate = setTimeout(() => {
      handleUpdateGroup(dispatch, activeGroup, currentUser);
      setSaved(true);
    }, 2000);
    return () => {
      setSaved(false);
      clearTimeout(delayDBUpdate);
    };
  }, [activeGroup, quicknotesState, marknotesState]);

  return (
    <React.Fragment>
      <PageHeader
        item={activeGroup}
        handleEditField={handleEditField}
        setFilterText={setFilterText}
        icon={<FolderOpenIcon filled />}
        saved={saved}
      >
        <PageHeaderButton title="Options" onClick={toggleColorMenu}>
          <PencilSquareIcon />
        </PageHeaderButton>
        <PageHeaderButton title="Delete Note" onClick={toggleConfirmDelete}>
          <TrashIcon />
        </PageHeaderButton>
        <PageHeaderButton title="Favorite" onClick={() => handleFavorite()}>
          {activeGroup.favorited === false ? <StarIcon /> : <StarIcon filled />}
        </PageHeaderButton>
        <PageHeaderButton
          onClick={() => history.goBack()}
          title="Return to Notes"
        >
          <ArrowUturnRightIcon />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <Section name="Quicknotes">
          <QNList
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            QNFilterText={filterText}
            setSaved={setSaved}
          ></QNList>
        </Section>
        <Section name="Marknotes">
          <MNList
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
            MNFilterText={filterText}
          />
        </Section>
        <Section name="Checklists">
          <ChecklistList
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
          />
        </Section>
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={activeGroup}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </React.Fragment>
  );
};

export default GroupPage;
