/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

import { enqueueSnackbar } from "notistack";

// Component Imports
import UserPlusIcon from "../icons/UserPlusIcon";
import ModalMenu from "../menus/ModalMenu";
import ArrowRightOnRectangleIcon from "../icons/ArrowRightOnRectangleIcon";
import ModalInput from "./ModalInput";
import { Form, FormButton, ModalContent } from "./AuthForm";

// Image and icon imports
import EmailIcon from "../icons/EmailIcon";
import KeyIcon from "../icons/KeyIcon";

export interface CreateAccountModalProps {
  openCreateAccount: boolean;
  setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  openCreateAccount,
  setOpenCreateAccount,
}) => {
  return (
    <ModalMenu
      heading={"Create a NotesNexus Account"}
      icon={<UserPlusIcon />}
      showMenuState={openCreateAccount}
      setShowMenuState={setOpenCreateAccount}
    >
      <ModalContent>
        <p>Enter your information below to create an account.</p>
        <Form>
          <ModalInput
            name={"create-account-email"}
            icon={<EmailIcon />}
            placeholder={"Enter Your Email"}
            type="email"
          />
          <ModalInput
            name={"create-account-password"}
            icon={<KeyIcon />}
            placeholder={"Enter Your Password"}
            type="password"
          />
          <ModalInput
            name={"create-account-password-confirm"}
            icon={<KeyIcon />}
            placeholder={"Confirm Your Password"}
            type="password"
          />
          <FormButton>
            Create Account <ArrowRightOnRectangleIcon />
          </FormButton>
        </Form>
        <small>
          Already have an account? <a>Sign in here.</a>
        </small>
      </ModalContent>
    </ModalMenu>
  );
};

export default CreateAccountModal;
