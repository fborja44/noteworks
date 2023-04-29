/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";

import styled from "@emotion/styled";
import { enqueueSnackbar } from "notistack";

// Firebase imports
import { User } from "firebase/auth";

// Common imports
import { COLOR } from "../../common/color";

// Component Imports
import ModalMenu from "../menus/ModalMenu";
import ModalInput from "../auth/ModalInput";
import { Form, ModalContent } from "../auth/AuthForm";

// Image and icon imports
import TrashIcon from "../icons/TrashIcon";
import { deleteAllUserNotes } from "../../utils/users";
import { useDispatch } from "react-redux";
import ExclamationCircleIcon from "../icons/ExclamationCircleIcon";

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

export interface DeleteUserNotesModalProps {
  currentUser: User;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DeleteUserNotesErrors {
  confirm: string;
}

const defaultErrors: DeleteUserNotesErrors = {
  confirm: "",
};

const DeleteUserNotesModal: React.FC<DeleteUserNotesModalProps> = ({
  currentUser,
  showMenuState,
  setShowMenuState,
}) => {
  // Dispatch hook
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({ confirm: "" });

  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  /**
   * Handles note deleltion for the current user.
   */
  const handleDeleteAll = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setLoading(true);
    setErrors(defaultErrors);
    if (!confirm.trim() || confirm.trim().toLowerCase() !== "yes") {
      setErrors({
        confirm: "This field is required.",
      });
    } else {
      try {
        const delete_status = await deleteAllUserNotes(dispatch, currentUser);
        if (!delete_status) {
          // Check if any note type failed to delete
          enqueueSnackbar(`Failed to delete all notes.`, {
            variant: "error",
          });
          setLoading(false);
          return;
        }
        enqueueSnackbar("All notes have been deleted.", {
          variant: "success",
        });
        setShowMenuState(false);
        setConfirm("");
      } catch (e) {
        console.log(e);
        enqueueSnackbar(`Something went wrong when deleting notes.`, {
          variant: "error",
        });
        return;
      }
    }
    setLoading(false);
  };

  return (
    <ModalMenu
      heading={`Permanently Delete Account`}
      icon={<TrashIcon />}
      showMenuState={showMenuState}
      setShowMenuState={setShowMenuState}
    >
      <ModalContent>
        <p>
          WARNING: All notes and data will be deleted permanently. This action
          cannot be reversed. Enter 'yes' in the prompt below to confirm.
        </p>
        <Form id="delete-account-form">
          <ModalInput
            id="confirm"
            name="deleteConfirm"
            icon={<ExclamationCircleIcon />}
            placeholder="Enter 'yes' to confirm."
            value={confirm}
            type="text"
            error={errors.confirm}
            handleChange={setConfirm}
          />
          <DeleteButton
            type="submit"
            onClick={(event) => handleDeleteAll(event)}
          >
            <span className={loading ? "blink" : ""}>Confirm</span>
          </DeleteButton>
        </Form>
      </ModalContent>
    </ModalMenu>
  );
};

export default DeleteUserNotesModal;
