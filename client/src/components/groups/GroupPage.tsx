/* Individual Group Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";

// Component imports
import PageHeaderButton from "../pageheader/PageHeaderButton";
import { InputPageHeader } from "../pageheader/PageHeader";
import Section, { Empty } from "../Section";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import ColorMenu from "../menus/ColorMenu";
import MNList from "../marknotes/MNList";
import QNList from "../quicknotes/QNList";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
import { IoReturnUpForward } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";
import { TiStar, TiStarOutline } from "react-icons/ti";

/**
 * Props for GroupPage
 */
export interface GroupPageProps {
  currentGroup: Group;
  groups: Group[];
  updateGroupsList: Function;
  quicknotes: Quicknote[];
  updateQuicknotesList: Function;
  marknotes: Marknote[];
  updateMarknotesList: Function;
  fetchGroups: Function;
  fetchQuicknotes: Function;
  fetchMarknotes: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  handleUpdateQuicknote: (noteId: string, updatedQuicknote: Quicknote) => void;
  handleDeleteQuicknote: (noteId: string) => void;
  handleUpdateMarknote: (noteId: string, updatedMarknote: Marknote) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Group page component
 */
const GroupPage: React.FC<GroupPageProps> = ({
  currentGroup,
  groups,
  updateGroupsList,
  quicknotes,
  updateQuicknotesList,
  marknotes,
  updateMarknotesList,
  fetchGroups,
  fetchQuicknotes,
  fetchMarknotes,
  handleUpdateGroup,
  handleDeleteGroup,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}) => {
  // History
  const history = useHistory();

  /**
   * State for current group info
   */
  const [group, setGroup] = useState(currentGroup);

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle changes in a note's field.
   * @param key The field being changed
   * @param value The new value of the field
   * @param updateDate If true, updates the note's last modified date. [default=false]
   */
  const handleEditField = (
    key: string,
    value: any,
    updateDate: Boolean = true
  ) => {
    let updatedGroup;
    if (updateDate) {
      updatedGroup = {
        ...group,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedGroup = {
        ...group,
        [key]: value,
      };
    }
    setGroup(updatedGroup);
  };

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleUpdateGroup(group._id, {
      ...group,
      color: color,
    });
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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

  /**
   * Effect hook to update group page when groups change (i.e. note is deleted, groups are updated);
   */
  useEffect(() => {
    fetchGroups();
    fetchQuicknotes();
    fetchMarknotes();
  }, [groups, fetchGroups, fetchMarknotes, fetchQuicknotes]);

  useEffect(() => {
    const delayDBUpdate = setTimeout(() => {
      handleUpdateGroup(group._id, group);
      updateGroupsList(group._id, group);
    }, 1000);
    return () => clearTimeout(delayDBUpdate);
  }, [group, handleUpdateGroup, updateGroupsList]);

  return (
    <React.Fragment>
      <InputPageHeader item={group} handleEditField={handleEditField}>
        <PageHeaderButton title="Options" onClick={toggleColorMenu}>
          <RiEdit2Line />
        </PageHeaderButton>
        <PageHeaderButton title="Delete Note" onClick={toggleConfirmDelete}>
          <MdDeleteForever />
        </PageHeaderButton>
        <PageHeaderButton
          title="Favorite"
          onClick={() => {
            handleUpdateGroup(group._id, {
              ...group,
              favorited: !group.favorited,
            });
          }}
        >
          {group.favorited === false ? <TiStarOutline /> : <TiStar />}
        </PageHeaderButton>
        <PageHeaderButton
          onClick={() => history.goBack()}
          title="Return to Notes"
        >
          <IoReturnUpForward />
        </PageHeaderButton>
      </InputPageHeader>
      <div className="main-content-wrapper">
        {group.quicknotes.length > 0 ? (
          <Section name="Quicknotes">
            <QNList
              quicknotes={quicknotes.filter((note: Quicknote) =>
                group.quicknotes.includes(note._id)
              )}
              updateQuicknotesList={updateQuicknotesList}
              groups={groups}
              updateGroupsList={updateGroupsList}
              handleUpdateGroup={handleUpdateGroup}
              handleUpdateQuicknote={handleUpdateQuicknote}
              handleDeleteQuicknote={handleDeleteQuicknote}
              setSelectedTab={setSelectedTab}
            ></QNList>
          </Section>
        ) : null}
        {group.marknotes.length > 0 ? (
          <Section name="Marknotes">
            <MNList
              marknotes={marknotes.filter((note: Marknote) =>
                group.marknotes.includes(note._id)
              )}
              updateMarknotesList={updateMarknotesList}
              groups={groups}
              updateGroupsList={updateGroupsList}
              handleUpdateGroup={handleUpdateGroup}
              handleUpdateMarknote={handleUpdateMarknote}
              handleDeleteMarknote={handleDeleteMarknote}
              setSelectedTab={setSelectedTab}
            />
          </Section>
        ) : null}
        {group.quicknotes.length === 0 && group.marknotes.length === 0 ? (
          <Empty>This group is empty.</Empty>
        ) : null}
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={group}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        handleDelete={handleDeleteGroup}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </React.Fragment>
  );
};

export default GroupPage;
