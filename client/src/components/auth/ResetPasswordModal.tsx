/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";

import { enqueueSnackbar } from "notistack";

// Component Imports
import ModalMenu from "../menus/ModalMenu";
import UserIcon from "../icons/UserIcon";
import ModalInput from "./ModalInput";

// Image and icon imports
import EmailIcon from "../icons/EmailIcon";
import { Form, FormButton, ModalContent } from "./AuthForm";
import { validateEmail } from "../../common/utils";
import { doPasswordReset } from "../../firebase/Firebase";
import Alert from "../alert/Alert";

export interface ResetPasswordModalProps {
  openResetPassword: boolean;
  setOpenResetPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ResetPasswordErrors {
  email: string;
  firebase: string;
}

const defaultErrors: ResetPasswordErrors = {
  email: "",
  firebase: "",
};

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  openResetPassword,
  setOpenResetPassword,
}) => {
  // Loading state
  const [loading, setLoading] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<ResetPasswordErrors>(defaultErrors);

  // Email input state
  const [email, setEmail] = useState("");

  /**
   * Handles firebase reset password.
   * @param event Button clicked event.
   */
  const handleResetPassword = async () => {
    let errorFlag = false;
    setErrors(defaultErrors);
    setLoading(true);
    // Check for missing inputs
    if (!email.trim()) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: "This field is required.",
        };
      });
      setLoading(false);
      return;
    }
    if (!validateEmail(email.trim())) {
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
        await doPasswordReset(email);
        enqueueSnackbar(`Password reset email has been sent to ${email}.`, {
          variant: "info",
        });
        setOpenResetPassword(false);
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
      heading={"Reset Password"}
      icon={<UserIcon />}
      showMenuState={openResetPassword}
      setShowMenuState={setOpenResetPassword}
    >
      <ModalContent>
        <p>
          Enter your email below. You will be sent an email to reset your
          password.
        </p>
        {errors.firebase && <Alert>{errors.firebase}</Alert>}
        <Form id="reset-password-form">
          <ModalInput
            id="email"
            name={"reset-password-email"}
            icon={<EmailIcon />}
            placeholder={"Enter Your Email"}
            type="email"
            error={errors.email}
            value={email}
            handleChange={setEmail}
          />
          <FormButton type="submit" onClick={() => handleResetPassword()}>
            <span className={loading ? "blink" : ""}>Reset Password</span>
          </FormButton>
        </Form>
      </ModalContent>
    </ModalMenu>
  );
};

export default ResetPasswordModal;
