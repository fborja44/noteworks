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
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddChecklistItem,
  handleUpdateChecklist,
} from "../../utils/checklists";

// Common imports
import { Checklist, ChecklistItem } from "../../common/types";
import { COLOR, ColorId, NoteColor } from "../../common/color";

// Component imports
import ChecklistItemComponent from "./ChecklistItemComponent";
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
import { setUnsavedItems } from "../../redux/actions";

const StyledItemsList = styled.ul`
  width: fit-content;
  color: ${(props) => props.theme.main.textSecondary};
  font-size: 14px;
  padding-left: 1em;
`;

interface ItemsListProps {
  activeChecklist: Checklist;
  items: ChecklistItem[];
  setSaved: Function;
}

const ItemsList = ({ activeChecklist, items, setSaved }: ItemsListProps) => {
  // Dispatch state
  const dispatch = useDispatch();

  // Items list state
  const [itemsState, setItemsState] = useState(items);

  // Unsaved items state
  const unsavedItemsState = useSelector(
    (state: any) => state.unsavedItemsState
  );

  /**
   * Function to swap two checklist items.
   */
  const swapItems = async (index: number, up?: boolean) => {
    // Check if valid swap
    if ((up && index === 0) || (!up && index === itemsState.length - 1)) {
      return false;
    }
    const a = index;
    let updatedItems = itemsState;
    const temp = updatedItems[a];
    const b = up ? a - 1 : a + 1;
    updatedItems[a] = updatedItems[b];
    updatedItems[b] = temp;
    setItemsState(updatedItems);
    const updatedChecklist = {
      ...activeChecklist,
      items: updatedItems,
    };
    await handleUpdateChecklist(dispatch, updatedChecklist); // Update the whole checklist
    return true;
  };

  return (
    <StyledItemsList>
      {itemsState.map((item: ChecklistItem, index: number) => (
        <ChecklistItemComponent
          key={item._id}
          parent={activeChecklist}
          item={item}
          index={index}
          setSaved={setSaved}
          unsavedItems={unsavedItemsState}
          swapFunction={swapItems}
        />
      ))}
    </StyledItemsList>
  );
};

export default ItemsList;
