/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";
import { useHistory } from "react-router-dom";

import styled from "@emotion/styled";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

// Redux imports
import { useDispatch } from "react-redux";

// Common imports
import { Quicknote, Marknote, Group, Checklist } from "../../common/types";
import { COLOR } from "../../common/color";

// Component Imports
import ModalMenu from "./ModalMenu";
import TrashIcon from "../icons/TrashIcon";
import { handleDeleteMarknote } from "../../utils/marknotes";
import { handleDeleteQuicknote } from "../../utils/quicknotes";
import { handleDeleteGroup } from "../../utils/groups";
import { handleDeleteChecklist } from "../../utils/checklists";
import { enqueueSnackbar } from "notistack";

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
  border-radius: 5px;
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
  item: Quicknote | Marknote | Checklist | Group;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
  toggleConfirmDelete: (event: any) => void;
  redirect?: Boolean;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  item,
  showMenuState,
  setShowMenuState,
  toggleConfirmDelete,
  redirect,
}) => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // Dispatch
  const dispatch = useDispatch();

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
          onClick={(event) => {
            if (!currentUser || currentUser.uid !== item.author_id) {
              console.log("Error: Unauthorized action.");
              return;
            }
            try {
              if (item.type === "quicknote") {
                handleDeleteQuicknote(dispatch, item._id, currentUser);
              } else if (item.type === "marknote") {
                handleDeleteMarknote(dispatch, item._id, currentUser);
              } else if (item.type === "group") {
                handleDeleteGroup(dispatch, item._id, currentUser);
              } else if (item.type === "checklist") {
                handleDeleteChecklist(dispatch, item._id, currentUser);
              } else {
                return;
              }
              if (redirect) {
                history.goBack();
              }
              toggleConfirmDelete(event);
              enqueueSnackbar(`Successfully deleted ${item.type}.`, {
                variant: "success",
              });
            } catch (e: any) {
              console.log(e.toString());
              enqueueSnackbar(`Failed to delete ${item.type}.`, {
                variant: "error",
              });
            }
          }}
        >
          Confirm
        </DeleteButton>
      </MenuContent>
    </ModalMenu>
  );
};

export default ConfirmDelete;
