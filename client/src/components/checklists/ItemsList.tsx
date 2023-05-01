/* Checklist Items List Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

import styled from "@emotion/styled";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

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
  margin-bottom: 20px;
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
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

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
    if (!currentUser || currentUser.uid !== checklistState.author_id) {
      console.log("Error: Unauthorized action.");
      return;
    }
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
    await handleUpdateChecklist(dispatch, updatedChecklist, currentUser); // Update the whole checklist
    return true;
  };

  return (
    <StyledItemsList>
      {checklistState.items.map((item: ChecklistItem, index: number) => (
        <ChecklistItemComponent
          key={item._id}
          parent={checklistState}
          setParent={setChecklistState}
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
