/* Checklists Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useEffect, useState } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { useHistory } from "react-router-dom";

// Redux imports
import { useDispatch } from "react-redux";
import {
  handleAddChecklistItem,
  handleUpdateChecklist,
} from "../../utils/checklists";

// Common imports
import { Checklist, ChecklistItem } from "../../common/types";
import { COLOR, ColorId, NoteColor } from "../../common/color";

// Component imports
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
import ChevronUpIcon from "../icons/ChevronUpIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const ChecklistList = styled.ul`
  width: fit-content;
  color: ${(props) => props.theme.main.textSecondary};
  font-size: 14px;
  padding-left: 1em;
`;

export interface SingleChecklistPageProps {
  activeChecklist: Checklist;
}

const SingleChecklistPage: React.FC<SingleChecklistPageProps> = ({
  activeChecklist,
}) => {
  // Dispatch hook
  const dispatch = useDispatch();

  // History hook
  const history = useHistory();

  /**
   * State for current checklist info
   */
  const [checklist, setChecklist] = useState(activeChecklist);

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
        ...checklist,
        [key]: value,
        lastModified: Date.now(),
      };
    } else {
      updatedChecklist = {
        ...checklist,
        [key]: value,
      };
    }
    setChecklist(updatedChecklist);
  };

  /**
   * Adds a new item to the checklist.
   */
  const handleAddItem = async () => {
    const updatedChecklist = await handleAddChecklistItem(dispatch, checklist);
    setChecklist(updatedChecklist);
  };

  /**
   * Effect hook to delay saving to the database.
   */
  useEffect(() => {
    const delayDBUpdate = setTimeout(() => {
      handleUpdateChecklist(dispatch, checklist);
      setSaved(true);
    }, 2000);

    return () => {
      setSaved(false);
      clearTimeout(delayDBUpdate);
    };
  }, [checklist]);

  return (
    <React.Fragment>
      <PageHeader
        item={checklist}
        handleEditField={handleEditField}
        icon={<DocumentCheckIcon filled />}
        saved={saved}
      >
        <PageHeaderButton title="Add New Item" onClick={handleAddItem}>
          <PlusIcon />
        </PageHeaderButton>
        <PageHeaderButton title="Options" onClick={toggleColorMenu}>
          <PencilSquareIcon />
        </PageHeaderButton>
        <PageHeaderButton
          title="Delete Checklist"
          onClick={toggleConfirmDelete}
        >
          <TrashIcon />
        </PageHeaderButton>
        <PageHeaderButton
          title="Favorite"
          onClick={() => {
            const updatedChecklist = {
              ...checklist,
              favorited: !checklist.favorited,
            };
            setChecklist(checklist);
            dispatch(updatedChecklist);
          }}
        >
          {checklist.favorited === false ? <StarIcon /> : <StarIcon filled />}
        </PageHeaderButton>
        <PageHeaderButton
          onClick={() => history.goBack()}
          title="Close Checklist"
        >
          <ArrowUturnRightIcon />
        </PageHeaderButton>
      </PageHeader>
      <div className="main-content-wrapper">
        <ChecklistList>
          {checklist.items.map((item: ChecklistItem) => (
            <ItemComponent item={item} />
          ))}
        </ChecklistList>
      </div>
      <ColorMenu
        showColorMenu={showColorMenu}
        setShowColorMenu={setShowColorMenu}
        handleEditColor={handleEditColor}
      />
      <ConfirmDelete
        item={checklist}
        showMenuState={showConfirmDelete}
        setShowMenuState={setShowConfirmDelete}
        toggleConfirmDelete={toggleConfirmDelete}
        redirect={true}
      />
    </React.Fragment>
  );
};

export default SingleChecklistPage;

const ItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;

  .arrows {
    display: flex;
    flex-direction: column;
    margin-right: 1em;
    justify-content: center;
    align-items: center;

    button {
      width: fit-content;
      height: 14px;
      padding: 0;
      background: inherit;
      border: none;
      color: inherit;
    }

    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

interface ItemProps {
  item: ChecklistItem;
}

const ItemComponent = ({ item }: ItemProps) => {
  return (
    <ItemContainer>
      <span className="arrows">
        <button>
          <ChevronUpIcon />
        </button>
        <button>
          <ChevronDownIcon />
        </button>
      </span>
      <input type="checkbox" name={`checkbox-${item._id}`} />
      {item.content.trim().length > 0 ? (
        <span>{item.content}</span>
      ) : (
        <span className="italic">Empty item</span>
      )}
    </ItemContainer>
  );
};
