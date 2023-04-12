/* Checklists Page Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateChecklist } from "../../utils/checklists";

// Common imports
import { Checklist, ChecklistItem } from "../../common/types";

// Component imports
import ChecklistItemComponent from "./ChecklistItemComponent";

const StyledItemsList = styled.ul`
  width: fit-content;
  color: ${(props) => props.theme.main.textSecondary};
  font-size: 14px;
  padding-left: 1em;
`;

interface ItemsListProps {
  checklistState: Checklist;
  setChecklistState: Function;
  items: ChecklistItem[];
  setSaved: Function;
}

const ItemsList = ({
  checklistState,
  setChecklistState,
  items,
  setSaved,
}: ItemsListProps) => {
  // Dispatch state
  const dispatch = useDispatch();

  // Unsaved items state
  const unsavedItemsState = useSelector(
    (state: any) => state.unsavedItemsState
  );

  /**
   * Function to swap two checklist items.
   */
  const swapItems = async (index: number, up?: boolean) => {
    // Check if valid swap
    if (
      (up && index === 0) ||
      (!up && index === checklistState.items.length - 1)
    ) {
      return false;
    }
    const a = index;
    let updatedItems = checklistState.items;
    const temp = updatedItems[a];
    const b = up ? a - 1 : a + 1;
    updatedItems[a] = updatedItems[b];
    updatedItems[b] = temp;
    const updatedChecklist = {
      ...checklistState,
      items: updatedItems,
    };
    setChecklistState(updatedChecklist);
    await handleUpdateChecklist(dispatch, updatedChecklist); // Update the whole checklist
    return true;
  };

  return (
    <StyledItemsList>
      {checklistState.items.map((item: ChecklistItem, index: number) => (
        <ChecklistItemComponent
          key={item._id}
          parent={checklistState}
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
