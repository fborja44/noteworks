/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "@emotion/styled";
import { enqueueSnackbar } from "notistack";

// Firebase imports
import { doChangePassword } from "../../firebase/Firebase";
import { User } from "firebase/auth";

// Component Imports
import ModalMenu from "../menus/ModalMenu";
import ModalInput from "../auth/ModalInput";
import Alert from "../alert/Alert";
import { Form, FormButton, ModalContent } from "../auth/AuthForm";

// Image and icon imports
import KeyIcon from "../icons/KeyIcon";
import TrashIcon from "../icons/TrashIcon";

export interface ChangePasswordModalProps {
  currentUser: User;
  showMenuState: boolean;
  setShowMenuState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ChangePasswordErrors {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  firebase: string;
}

const defaultErrors: ChangePasswordErrors = {
  oldPassword: "",
  newPassword: "",
  newPasswordConfirm: "",
  firebase: "",
};

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  currentUser,
  showMenuState,
  setShowMenuState,
}) => {
  // History
  const history = useHistory();

  const [errors, setErrors] = useState<ChangePasswordErrors>(defaultErrors);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const [loading, setLoading] = useState(false);

  /**
   * Handles password changes.
   */
  const handlePasswordChange = async () => {
    setLoading(true);
    let errorFlag = false;
    if (!currentUser || !currentUser.email) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          firebase: "Could not authenticate user.",
        };
      });
      errorFlag = true;
      setLoading(false);
      return;
    }
    if (!oldPassword.trim()) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          oldPassword: "This field is required.",
        };
      });
      errorFlag = true;
    }
    if (!newPassword.trim()) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          newPassword: "This field is required.",
        };
      });
      errorFlag = true;
    }
    if (!newPasswordConfirm.trim()) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          newPasswordConfirm: "This field is required.",
        };
      });
      errorFlag = true;
    }
    if (newPassword.trim() !== newPasswordConfirm.trim()) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          newPassword: "Passwords do not match.",
          newPasswordConfirm: "Passwords do not match.",
        };
      });
      errorFlag = true;
    }
    if (!errorFlag) {
      try {
        await doChangePassword(currentUser.email, oldPassword, newPassword);
        enqueueSnackbar("Password has been changed.", {
          variant: "success",
        });
        history.push("/");
        setShowMenuState(false);
        setOldPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
      } catch (e) {
        if (e instanceof Error) {
          console.log(e);
          setErrors((prevErrors) => {
            return { ...prevErrors, firebase: (e as any).toString() };
          });
        }
      }
    }
    setLoading(false);
  };

  return (
    <ModalMenu
      heading={`Reset Your Password`}
      icon={<TrashIcon />}
      showMenuState={showMenuState}
      setShowMenuState={setShowMenuState}
    >
      <ModalContent>
        <p>Enter your old and new password to continue.</p>
        {errors.firebase && <Alert>{errors.firebase}</Alert>}
        <Form id="delete-account-form">
          <ModalInput
            id="password"
            name="oldPassword"
            icon={<KeyIcon />}
            placeholder="Enter Your Old Password"
            value={oldPassword}
            type="password"
            error={errors.oldPassword}
            handleChange={setOldPassword}
          />
          <ModalInput
            id="new-password"
            name="newPassword"
            icon={<KeyIcon />}
            placeholder="Enter Your New Password"
            value={newPassword}
            type="password"
            error={errors.newPassword}
            handleChange={setNewPassword}
          />
          <ModalInput
            id="new-password"
            name="newPasswordConfirm"
            icon={<KeyIcon />}
            placeholder="Enter Your New Password Again"
            value={newPasswordConfirm}
            type="password"
            error={errors.newPasswordConfirm}
            handleChange={setNewPasswordConfirm}
          />
          <FormButton type="submit" onClick={() => handlePasswordChange()}>
            <span className={loading ? "blink" : ""}>Confirm</span>
          </FormButton>
        </Form>
      </ModalContent>
    </ModalMenu>
  );
};

export default ChangePasswordModal;
