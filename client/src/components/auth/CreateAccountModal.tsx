/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";

import { enqueueSnackbar } from "notistack";

import { doCreateUserWithEmailAndPassword } from "../../firebase/Firebase";

// Common imports
import { validateEmail } from "../../common/utils";

// Component Imports
import Alert from "../alert/Alert";
import UserPlusIcon from "../icons/UserPlusIcon";
import ModalMenu from "../menus/ModalMenu";
import PlusIcon from "../icons/PlusIcon";
import ModalInput from "./ModalInput";
import { Form, FormButton, ModalContent } from "./AuthForm";

// Image and icon imports
import EmailIcon from "../icons/EmailIcon";
import KeyIcon from "../icons/KeyIcon";

export interface CreateAccountModalProps {
  openCreateAccount: boolean;
  setOpenCreateAccount: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SignupErrors {
  email: string;
  password: string;
  passwordConfirm: string;
  firebase: string;
}

const defaultErrors: SignupErrors = {
  email: "",
  password: "",
  passwordConfirm: "",
  firebase: "",
};

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  openCreateAccount,
  setOpenCreateAccount,
  setOpenLogin,
}) => {
  // Loading state
  const [loading, setLoading] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<SignupErrors>(defaultErrors);

  /**
   * Handles Firebase Authentication user creation.
   * Password must be at least 8 characters.
   * Email must be a valid email.
   * @param event Button clicked event.
   */
  const handleSignUp = async (event: any) => {
    event.preventDefault();
    let errorFlag = false;
    setErrors(defaultErrors);
    setLoading(true);
    const { email, password, passwordConfirm } = event.target.elements;
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
    // Check for valid email
    if (email.value.trim() && !validateEmail(email.value.trim())) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "Email is missing an @. (ex. example@gmail.com)",
        };
      });
      errorFlag = true;
    }
    // Check for valid password
    if (password.value.trim() && password.value.trim().length < 8) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Password must be at least 8 characters.",
        };
      });
      errorFlag = true;
    } else if (
      // Check for matching passwords
      password.value.trim() &&
      passwordConfirm.value.trim() &&
      password.value.trim() !== passwordConfirm.value.trim()
    ) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          password: "Passwords do not match.",
          passwordConfirm: "Passwords do not match.",
        };
      });
      errorFlag = true;
    }
    if (!errorFlag) {
      // Create account through firebase
      setErrors(defaultErrors);
      try {
        await doCreateUserWithEmailAndPassword(
          email.value.trim(),
          password.value.trim(),
          ""
        );
        setOpenCreateAccount(false);
        enqueueSnackbar("You have been successfully signed up!", {
          variant: "success",
        });
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
      heading={"Create a NotesNexus Account"}
      icon={<UserPlusIcon />}
      showMenuState={openCreateAccount}
      setShowMenuState={setOpenCreateAccount}
    >
      <ModalContent>
        <p>Enter your information below to create an account.</p>
        {errors.firebase && <Alert>{errors.firebase}</Alert>}
        <Form id="signup-form" onSubmit={(event) => handleSignUp(event)}>
          <ModalInput
            id="email"
            name="signupEmail"
            icon={<EmailIcon />}
            placeholder="Enter Your Email"
            type="email"
            error={errors.email}
          />
          <ModalInput
            id="password"
            name="signupPassword"
            icon={<KeyIcon />}
            placeholder="Enter Your Password"
            type="password"
            error={errors.password}
          />
          <ModalInput
            id="passwordConfirm"
            name="signupPasswordConfirm"
            icon={<KeyIcon />}
            placeholder="Confirm Your Password"
            type="password"
            error={errors.passwordConfirm}
          />
          <FormButton type="submit">
            <span className={loading ? "blink" : ""}>
              Create Account <PlusIcon />
            </span>
          </FormButton>
        </Form>
        <small>
          Already have an account?{" "}
          <a
            onClick={() => {
              setOpenCreateAccount(false);
              setOpenLogin(true);
            }}
          >
            Sign in here.
          </a>
        </small>
      </ModalContent>
    </ModalMenu>
  );
};

export default CreateAccountModal;
