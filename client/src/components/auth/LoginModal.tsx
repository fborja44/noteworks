/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";

import { enqueueSnackbar } from "notistack";

// Component Imports
import ModalMenu from "../menus/ModalMenu";
import UserIcon from "../icons/UserIcon";
import ArrowRightOnRectangleIcon from "../icons/ArrowRightOnRectangleIcon";
import ModalInput from "./ModalInput";

// Image and icon imports
import EmailIcon from "../icons/EmailIcon";
import KeyIcon from "../icons/KeyIcon";
import { Form, FormButton, ModalContent } from "./AuthForm";

export interface LoginModalProps {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({ openLogin, setOpenLogin }) => {
  return (
    <ModalMenu
      heading={"Login to Existing Account"}
      icon={<UserIcon />}
      showMenuState={openLogin}
      setShowMenuState={setOpenLogin}
    >
      <ModalContent>
        <p>Enter your login info below to access your account.</p>
        <Form>
          <ModalInput
            name={"login-email"}
            icon={<EmailIcon />}
            placeholder={"Enter Your Email"}
            type="email"
          />
          <ModalInput
            name={"login-password"}
            icon={<KeyIcon />}
            placeholder={"Enter Your Password"}
            type="password"
          />
          <FormButton>
            Login <ArrowRightOnRectangleIcon />
          </FormButton>
        </Form>
        <small>
          Forgot your password? <a>Reset Password.</a>
        </small>
        <small>
          New here? <a>Create an Account.</a>
        </small>
      </ModalContent>
    </ModalMenu>
  );
};

export default LoginModal;
