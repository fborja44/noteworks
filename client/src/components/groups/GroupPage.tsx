/* Individual Group Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Redux state
import { useSelector } from "react-redux";

// Common imports
import { Group, Marknote, Quicknote } from "../../common/types";
import { ColorId } from "../../common/color";

// Component imports
import PageHeaderButton from "../pageheader/PageHeaderButton";
import { InputPageHeader } from "../pageheader/PageHeader";
import Section, { Empty } from "../Section";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import ColorMenu from "../menus/ColorMenu";
import MNList from "../marknotes/MNList";
import QNList from "../quicknotes/QNList";

// Image and icon imports
import SparkleIcon from "../icons/SparkleIcon";
import TrashIcon from "../icons/TrashIcon";
import PencilSquareIcon from "../icons/PencilSquareIcon";
import StarIcon from "../icons/StarIcon";
import ArrowUturnRightIcon from "../icons/ArrowUturnRightIcon";
import FolderOpenIcon from "../icons/FolderOpenIcon";

/**
 * Props for GroupPage
 */
export interface GroupPageProps {
  currentGroup: Group;
  groups: Group[];
  updateGroupsList: Function;
  handleUpdateGroup: (groupId: string, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Group page component
 */
const GroupPage: React.FC<GroupPageProps> = ({
  currentGroup,
  groups,
  updateGroupsList,
  handleUpdateGroup,
  handleDeleteGroup,
  setSelectedTab,
}) => {
  // History
  const history = useHistory();

  // Quicknotes State
  const quicknotesState: Quicknote[] = useSelector(
    (state: any) => state.quicknotesState
  );

  // Marknotes State
  const marknotesState: Marknote[] = useSelector(
    (state: any) => state.marknotesState
  );

  /**
   * State for current group info
   */
  const [group, setGroupPage] = useState(currentGroup);

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  // Data Saved State
  const [saved, setSaved] = useState(true);

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
    setGroupPage(updatedGroup);
  };

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
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

  useEffect(() => {
    const delayDBUpdate = setTimeout(() => {
      handleUpdateGroup(group._id, group);
      updateGroupsList(group._id, group);
      setSaved(true);
    }, 2000);
    return () => {
      setSaved(false);
      clearTimeout(delayDBUpdate);
    };
  }, [group, quicknotesState, marknotesState]);

  return (
    <React.Fragment>
      <InputPageHeader
        item={group}
        handleEditField={handleEditField}
        icon={<FolderOpenIcon filled />}
        saved={saved}
      >
        <PageHeaderButton title="Options" onClick={toggleColorMenu}>
          <PencilSquareIcon />
        </PageHeaderButton>
        <PageHeaderButton title="Delete Note" onClick={toggleConfirmDelete}>
          <TrashIcon />
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
          {group.favorited === false ? <StarIcon /> : <StarIcon filled />}
        </PageHeaderButton>
        <PageHeaderButton
          onClick={() => history.goBack()}
          title="Return to Notes"
        >
          <ArrowUturnRightIcon />
        </PageHeaderButton>
      </InputPageHeader>
      <div className="main-content-wrapper">
        {group.quicknotes.length > 0 ? (
          <Section name="Quicknotes">
            <QNList
              groups={groups}
              updateGroupsList={updateGroupsList}
              handleUpdateGroup={handleUpdateGroup}
              setSelectedTab={setSelectedTab}
              setGroupPage={setGroupPage}
              setSaved={setSaved}
            ></QNList>
          </Section>
        ) : null}
        {group.marknotes.length > 0 ? (
          <Section name="Marknotes">
            <MNList
              groups={groups}
              updateGroupsList={updateGroupsList}
              handleUpdateGroup={handleUpdateGroup}
              setSelectedTab={setSelectedTab}
              setGroupPage={setGroupPage}
            />
          </Section>
        ) : null}
        {group.quicknotes.length === 0 && group.marknotes.length === 0 ? (
          <div
            css={css`
              width: 100%;
              height: 80%;
              display: flex;
              justify-content: center;
              align-items: center;

              .sparkle-icon {
                height: 50px;
                width: 50px;
                margin-top: 1.5em;
              }
            `}
          >
            <Empty>
              <p>This group is empty.</p>
              <SparkleIcon className="sparkle-icon" />
            </Empty>
          </div>
        ) : null}
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        itemsState={groups}
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
