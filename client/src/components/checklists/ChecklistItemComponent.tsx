/* Checklists Page Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState, useEffect } from "react";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Redux imports
import { useDispatch } from "react-redux";
import { handleUpdateChecklist } from "../../utils/checklists";

// Common imports
import { Checklist, ChecklistItem } from "../../common/types";
import { COLOR } from "../../common/color";

// Image and icon imports
import ChevronRightIcon from "../icons/ChevronRightIcon";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import { addUnsavedItem, setUnsavedItems } from "../../redux/actions";

const ItemContainer = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
`;

const Checkbox = styled.input`
  &[type="checkbox"] {
    position: relative;
    width: 1.5em;
    height: 1.5em;
    color: $black;
    border: 2px solid ${(props) => props.theme.main.textSecondary};
    border-radius: 3px;
    margin: 0 1.25em;
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: background 100ms cubic-bezier(0.1, 0.1, 0.25, 1);

    &::before {
      position: absolute;
      content: "";
      display: block;
      width: 4px;
      height: 12px;
      left: 5px;
      bottom: 2px;
      border-style: solid;
      border-color: white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      opacity: 0;
      transition: opacity 100ms cubic-bezier(0.1, 0.1, 0.25, 1);
    }

    &:checked {
      color: $white;
      border-color: ${COLOR.green.primary};
      background: ${COLOR.green.primary};

      &::before {
        opacity: 1;
      }
      ~ label::before {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      }
    }

    &:disabled {
      border-color: ${COLOR.dark_grey.secondary};
      background: inherit;

      &::before {
        opacity: 0;
      }
    }
  }
`;

const ArrowsContainer = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    width: fit-content;
    height: 16px;
    padding: 0;
    background: inherit;
    border: none;
    color: inherit;

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.main.textPrimary};
    }

    &:disabled {
      cursor: initial;
      color: ${COLOR.dark_grey.secondary};
    }
  }

  svg {
    width: 15px;
    height: 15px;
  }
`;

const ContentInput = styled.input`
  &[type="text"] {
    background: ${(props) => props.theme.main.background};
    outline: none;
    border: 0;
    color: ${(props) => props.theme.main.textSecondary};
    font-weight: 500;
    font-size: 14px;

    &.checked {
      text-decoration: line-through;
      color: ${COLOR.dark_grey.secondary};
    }
  }
`;

interface ItemProps {
  parent: Checklist;
  setParent: Function;
  item: ChecklistItem;
  index: number;
  setSaved: Function;
  unsavedItems: ChecklistItem[];
  swapFunction: Function;
}

const ChecklistItemComponent = ({
  parent,
  setParent,
  item,
  index,
  setSaved,
  unsavedItems,
  swapFunction,
}: ItemProps) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch hook
  const dispatch = useDispatch();

  // Current item state
  const [itemState, setItemState] = useState<ChecklistItem>(item);

  /**
   * Function to handle changes in a checklist's field
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleEditField = (key: string, value: string | boolean) => {
    setSaved(false);
    const updatedChecklistItem = {
      ...itemState,
      [key]: value,
    };
    setItemState(updatedChecklistItem);
    // Update unsaved
    dispatch(addUnsavedItem(updatedChecklistItem));
  };

  /**
   * Function to handle changes in a checklist's field
   * @param key The field being changed
   * @param value The new value of the field
   */
  const handleChecked = (value: boolean) => {
    setSaved(false);
    const updatedChecklistItem = {
      ...itemState,
      checked: value,
    };
    const newParentItems = parent.items.map((item) =>
      item._id === itemState._id ? updatedChecklistItem : item
    );
    parent.items = newParentItems;
    setParent(parent);
    setItemState(updatedChecklistItem);
    dispatch(addUnsavedItem(updatedChecklistItem));
    setSaved(true);
  };

  /**
   * Delay saving of checklist items.
   */
  useEffect(() => {
    const delayDBUpdate = setTimeout(() => {
      if (!currentUser || currentUser.uid !== parent.author_id) {
        console.log("Error: Unauthorized action.");
        return;
      }
      // Update every item in the unsaved queue.
      const filteredItems: ChecklistItem[] = parent.items.filter(
        (filterItem) => {
          for (const updatedItem of unsavedItems) {
            if (filterItem._id === updatedItem._id) {
              return false;
            }
          }
          return true;
        }
      );
      const updatedItems = [...unsavedItems, ...filteredItems];
      const updatedChecklist = {
        ...parent,
        items: updatedItems,
      };
      handleUpdateChecklist(dispatch, updatedChecklist, currentUser);
      dispatch(setUnsavedItems([]));
      setSaved(true);
    }, 5000);
    return () => {
      clearTimeout(delayDBUpdate);
    };
  }, [itemState]);

  if (!itemState) return null;

  return (
    <ItemContainer>
      <ArrowsContainer>
        <button
          title="Shift Up"
          onClick={() => swapFunction(index, true)}
          disabled={index === 0}
        >
          <ChevronRightIcon
            strokeWidth={3}
            css={css`
              transform: rotate(-90deg);
            `}
          />
        </button>
        <button
          title="Shift Down"
          onClick={() => swapFunction(index)}
          disabled={index === parent.items.length - 1}
        >
          <ChevronLeftIcon
            strokeWidth={3}
            css={css`
              transform: rotate(-90deg);
            `}
          />
        </button>
      </ArrowsContainer>
      <Checkbox
        type="checkbox"
        name={`checkbox-${item._id}`}
        checked={itemState.checked}
        onChange={(event) => handleChecked(event.target.checked)}
      />
      <ContentInput
        type="text"
        value={itemState.content}
        placeholder="Empty Item"
        onChange={(event) => handleEditField("content", event.target.value)}
        spellCheck={false}
        className={`${itemState.checked && "checked"}`}
      />
    </ItemContainer>
  );
};

export default ChecklistItemComponent;
