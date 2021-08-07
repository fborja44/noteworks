/* Individual Group Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Link } from "react-router-dom";

// Common imports
import { Group } from "../../common/types";

// Component imports
import PageHeaderButton from "../pageheader/PageHeaderButton";
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";
import ColorMenu from "../menus/ColorMenu";

// Image and icon imports
import { MdDeleteForever } from "react-icons/md";
import { IoReturnUpForward } from "react-icons/io5";
import { RiEdit2Line } from "react-icons/ri";

/**
 * Props for GroupPage
 */
export interface GroupPageProps {
  currentGroup: Group;
  handleUpdateGroup: (currentGroup: Group, updatedGroup: Group) => void;
  handleDeleteGroup: (groupId: string) => void;
}

/**
 * Content for marknotes route
 */
const GroupPage: React.FC<GroupPageProps> = ({
  currentGroup,
  handleUpdateGroup,
  handleDeleteGroup,
}) => {
  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  /**
   * Function to handle a change in the note's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: string) => {
    handleUpdateGroup(currentGroup, {
      ...currentGroup,
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

  // TODO: Redirect to proper location on delete
  return (
    <React.Fragment>
      <PageHeader title={currentGroup.title}>
        <PageHeaderButton title="Options" onClick={toggleColorMenu}>
          <RiEdit2Line />
        </PageHeaderButton>
        <PageHeaderButton title="Delete Note" onClick={toggleConfirmDelete}>
          <MdDeleteForever />
        </PageHeaderButton>
        <PageHeaderButton onClick={undefined} title="Return to Notes">
          <Link to="/marknotes">
            <IoReturnUpForward />
          </Link>
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <Section name="Quicknotes"></Section>
        <Section name="Marknotes"></Section>
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={currentGroup}
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
