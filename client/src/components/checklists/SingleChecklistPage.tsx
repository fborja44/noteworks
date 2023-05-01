/* Checklists Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthProvider";

// Redux imports
import { useDispatch } from "react-redux";
import {
  handleAddChecklistItem,
  handleUpdateChecklist,
} from "../../utils/checklists";

// Common imports
import { Checklist } from "../../common/types";
import { ColorId, NoteColor } from "../../common/color";

// Component imports
import ItemsList from "./ItemsList";
import PageHeader from "../pageheader/PageHeader";
import DocumentCheckIcon from "../icons/DocumentCheckIcon";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import ColorMenu from "../menus/ColorMenu";
import ConfirmDelete from "../menus/ConfirmDeleteMenu";

// Image and icon imports
import ArrowUturnRightIcon from "../icons/ArrowUturnRightIcon";
import PencilSquareIcon from "../icons/PencilSquareIcon";
import TrashIcon from "../icons/TrashIcon";
import StarIcon from "../icons/StarIcon";
import PlusIcon from "../icons/PlusIcon";

export interface SingleChecklistPageProps {
  activeChecklist: Checklist;
}

const SingleChecklistPage: React.FC<SingleChecklistPageProps> = ({
  activeChecklist,
}) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  /**
   * State for current checklist info
   */
  const [checklistState, setChecklistState] = useState(activeChecklist);

  // Color menu state
  const [showColorMenu, setShowColorMenu] = useState(false);

  // Checklist Saved State
  const [saved, setSaved] = useState(true);

  /**
   * Function to handle a change in the checklist's color.
   * Does NOT change the last modified date.
   */
  const handleEditColor = (color: ColorId) => {
    handleEditField("color", color, false);
  };

  /**
   * Function to toggle the color menu
   */
  const toggleColorMenu = () => {
    // Toggle display of component
    setShowColorMenu((prev) => !prev);
  };

  // Quicknote Delete Menu state
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  /**
   * Function to toggle the confirm delete menu
   */
  const toggleConfirmDelete = () => {
    setShowConfirmDelete((prev) => !prev);
  };

  /**
   * Function to handle changes in a checklist's field
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleEditField = (
    key: string,
    value: string | Boolean | NoteColor,
    updateDate: Boolean = true
  ) => {
    let updatedChecklist;
    if (updateDate) {
      updatedChecklist = {
        ...checklistState,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedChecklist = {
        ...checklistState,
        [key]: value,
      };
    }
    setChecklistState(updatedChecklist);
  };

  /**
   * Adds a new item to the checklist.
   */
  const handleAddItem = async () => {
    if (!currentUser || currentUser.uid !== activeChecklist.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
    const updatedChecklist = await handleAddChecklistItem(
      dispatch,
      checklistState,
      currentUser
    );
    console.log(checklistState);
    setChecklistState(updatedChecklist);
  };

  /**
   * Effect hook to delay saving to the database.
   */
  useEffect(() => {
    if (!currentUser || currentUser.uid !== activeChecklist.author_id) return;
    const delayDBUpdate = setTimeout(() => {
      handleUpdateChecklist(dispatch, checklistState, currentUser);
      setSaved(true);
    }, 2000);

    return () => {
      setSaved(false);
      clearTimeout(delayDBUpdate);
    };
  }, [checklistState]);

  return (
    <React.Fragment>
      <PageHeader
        item={checklistState}
        handleEditField={handleEditField}
        icon={<DocumentCheckIcon filled />}
        saved={saved}
      >
        <PageHeaderButton id="new-item-button" title="Add New Item" onClick={handleAddItem}>
          <PlusIcon />
        </PageHeaderButton>
        <PageHeaderButton id="edit-color-button" title="Options" onClick={toggleColorMenu}>
          <PencilSquareIcon />
        </PageHeaderButton>
        <PageHeaderButton
          id="delete-checklist-button"
          title="Delete Checklist"
          onClick={toggleConfirmDelete}
        >
          <TrashIcon />
        </PageHeaderButton>
        <PageHeaderButton
          id="favorite-checklist-button"
          title="Favorite"
          onClick={() => {
            const updatedChecklist = {
              ...checklistState,
              favorited: !checklistState.favorited,
            };
            setChecklistState(updatedChecklist);
            dispatch(updatedChecklist);
          }}
        >
          {checklistState.favorited === false ? (
            <StarIcon />
          ) : (
            <StarIcon filled />
          )}
        </PageHeaderButton>
        <PageHeaderButton
          id="close-button"
          onClick={() => history.goBack()}
          title="Close Checklist"
        >
          <ArrowUturnRightIcon />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <ItemsList
          checklistState={checklistState}
          setChecklistState={setChecklistState}
          items={activeChecklist.items}
          setSaved={setSaved}
        />
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={checklistState}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </React.Fragment>
  );
};

export default SingleChecklistPage;
