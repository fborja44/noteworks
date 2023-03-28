/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";
import { useHistory } from "react-router-dom";

/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

// Common imports
import { Quicknote, Marknote, Group } from "../../common/types";
import { COLOR } from "../../common/color";

// Component Imports
import ModalMenu from "./ModalMenu";
import TrashIcon from "../icons/TrashIcon";

const MenuContent = styled.div`
  text-align: center;

  p {
    font-size: 14px;
    padding-bottom: 1em;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 0 auto;
  width: 200px;
  background-color: ${COLOR.red.primary};
  border: 1px solid ${(props) => props.theme.main.borderColor};
  color: white;
  height: 28px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 13px;

  &:visited {
    color: white;
  }

  &:hover {
    cursor: pointer;
    background-color: ${COLOR.red.secondary};
    transition: background-color 0.1s ease 0s;
  }
`;

export interface ConfirmDeleteProps {
  item: Marknote | Quicknote | Group;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete?: (id: string) => void;
  toggleConfirmDelete: (event: any) => void;
  redirect?: Boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  item,
  showMenuState,
  setShowMenuState,
  handleDelete,
  toggleConfirmDelete,
  redirect,
}) => {
  // History
  const history = useHistory();

  // Check if note title is empty
  const title = item.title.trim().length === 0 ? "Untitled Note" : item.title;

  return (
    <ModalMenu
      heading={`Delete ${
        item.type.charAt(0).toUpperCase() + item.type.slice(1)
      } "${title}"?`}
      icon={<TrashIcon />}
      showMenuState={showMenuState}
      setShowMenuState={setShowMenuState}
    >
      <MenuContent>
        <p>This action cannot be reversed.</p>
        <DeleteButton
          onClick={
            handleDelete
              ? (event) => {
                  handleDelete(item._id);
                  if (redirect) {
                    history.goBack();
                  }
                  toggleConfirmDelete(event);
                }
              : undefined
          }
        >
          Confirm
        </DeleteButton>
      </MenuContent>
    </ModalMenu>
  );
};

export default ConfirmDelete;
