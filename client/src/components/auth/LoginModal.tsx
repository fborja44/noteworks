/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";

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
import { validateEmail } from "../../common/utils";
import { doSignInWithEmailAndPassword } from "../../firebase/Firebase";
import Alert from "../alert/Alert";

export interface LoginModalProps {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LoginErrors {
  email: string;
  password: string;
  firebase: string;
}

const defaultErrors: LoginErrors = {
  email: "",
  password: "",
  firebase: "",
};

const LoginModal: React.FC<LoginModalProps> = ({
  openLogin,
  setOpenLogin,
  setOpenCreateAccount,
}) => {
  // Loading state
  const [loading, setLoading] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<LoginErrors>(defaultErrors);

  /**
   * Handles firebase user login.
   * @param event Button clicked event.
   */
  const handleLogin = async (event: any) => {
    event.preventDefault();
    let errorFlag = false;
    setErrors(defaultErrors);
    setLoading(true);
    const { email, password } = event.target.elements;
    // Check for missing inputs
    for (const elem of event.target.elements) {
      if (elem.nodeName === "INPUT" && !elem.value.trim()) {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            [elem.id]: "This field is required.",
          };
        });
        errorFlag = true;
      }
    }
    if (!validateEmail(email.value.trim())) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "Email is missing an @. (ex. example@gmail.com)",
        };
      });
      errorFlag = true;
    }
    if (!errorFlag) {
      try {
        await doSignInWithEmailAndPassword(
          email.value.trim(),
          password.value.trim()
        );
        setOpenLogin(false);
        enqueueSnackbar("You have been logged in!", { variant: "success" });
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
          setErrors((prevErrors) => {
            return { ...prevErrors, firebase: (err as any).toString() };
          });
        }
      }
    }
    setLoading(false);
  };
  return (
    <ModalMenu
      heading={"Login to Existing Account"}
      icon={<UserIcon />}
      showMenuState={openLogin}
      setShowMenuState={setOpenLogin}
    >
      <ModalContent>
        <p>Enter your login info below to access your account.</p>
        {errors.firebase && <Alert>{errors.firebase}</Alert>}
        <Form id="login-form" onSubmit={(event) => handleLogin(event)}>
          <ModalInput
            id="email"
            name={"login-email"}
            icon={<EmailIcon />}
            placeholder={"Enter Your Email"}
            type="email"
            error={errors.email}
          />
          <ModalInput
            id="password"
            name={"login-password"}
            icon={<KeyIcon />}
            placeholder={"Enter Your Password"}
            type="password"
            error={errors.password}
          />
          <FormButton type="submit">
            <span className={loading ? "blink" : ""}>
              Login <ArrowRightOnRectangleIcon />
            </span>
          </FormButton>
        </Form>
        <small>
          Forgot your password? <button>Reset Password.</button>
        </small>
        <small>
          New here?{" "}
          <button
            onClick={() => {
              setOpenLogin(false);
              setOpenCreateAccount(true);
            }}
          >
            Create an Account.
          </button>
        </small>
      </ModalContent>
    </ModalMenu>
  );
};

export default LoginModal;
