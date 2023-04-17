/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "@emotion/styled";
import { enqueueSnackbar } from "notistack";

// Firebase imports
import { doDeleteUser } from "../../firebase/Firebase";
import { User } from "firebase/auth";

// Common imports
import { COLOR } from "../../common/color";

// Component Imports
import ModalMenu from "../menus/ModalMenu";
import ModalInput from "../auth/ModalInput";
import Alert from "../alert/Alert";
import { Form, ModalContent } from "../auth/AuthForm";

// Image and icon imports
import KeyIcon from "../icons/KeyIcon";
import TrashIcon from "../icons/TrashIcon";

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

export interface DeleteUserModalProps {
  currentUser: User;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  currentUser,
  showMenuState,
  setShowMenuState,
}) => {
  // History
  const history = useHistory();

  const [errors, setErrors] = useState({ password: "", firebase: "" });

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /**
   * Handles account deletion using the inputted password and current user.
   */
  const handleAccountDelete = async () => {
    setLoading(true);
    if (!currentUser || !currentUser.email) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          firebase: "Could not authenticate user.",
        };
      });
      return;
    }
    try {
      await doDeleteUser(currentUser.email, password);
      enqueueSnackbar("Account has been successfully deleted.", {
        variant: "success",
      });
      history.push("/");
      setShowMenuState(false);
      setPassword("");
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        setErrors((prevErrors) => {
          return { ...prevErrors, firebase: (e as any).toString() };
        });
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
        {errors.firebase && <Alert>{errors.firebase}</Alert>}
        <p>
          WARNING: All notes and data associated with this account will be lost.
          This action cannot be reversed.
        </p>
        <Form id="delete-account-form">
          <ModalInput
            id="password"
            name="deletePassword"
            icon={<KeyIcon />}
            placeholder="Enter Your Password To Confirm"
            value={password}
            type="password"
            error={errors.password}
            handleChange={setPassword}
          />
          <DeleteButton type="submit" onClick={() => handleAccountDelete()}>
            <span className={loading ? "blink" : ""}>Confirm</span>
          </DeleteButton>
        </Form>
      </ModalContent>
    </ModalMenu>
  );
};

export default DeleteUserModal;
