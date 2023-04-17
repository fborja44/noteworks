/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React, { useState } from "react";

import { enqueueSnackbar } from "notistack";

// Common imports
import { validateImageURL } from "../../common/utils";
import { doUpdateUserProfile } from "../../firebase/Firebase";
import { User } from "firebase/auth";

// Component Imports
import ModalMenu from "../menus/ModalMenu";
import UserIcon from "../icons/UserIcon";
import ModalInput from "./ModalInput";
import Alert from "../alert/Alert";
import { Form, FormButton, ModalContent } from "./AuthForm";

// Image and icon imports
import PhotoIcon from "../icons/PhotoIcon";
import UserCircleIcon from "../icons/UserCircleIcon";

export interface EditProfileModalProps {
  currentUser: User;
  openEditProfile: boolean;
  setOpenEditProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EditProfileErrors {
  username: string;
  photoURL: string;
  firebase: string;
}

const defaultErrors: EditProfileErrors = {
  username: "",
  photoURL: "",
  firebase: "",
};

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  currentUser,
  openEditProfile,
  setOpenEditProfile,
}) => {
  // Loading state
  const [loading, setLoading] = useState(false);

  // Errors state
  const [errors, setErrors] = useState<EditProfileErrors>(defaultErrors);

  // Display name input state
  const [username, setUsername] = useState(currentUser.displayName || "");

  // Photo URL input state
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL || "");

  /**
   * Handles firebase reset password.
   * @param event Button clicked event.
   */
  const handleEditProfile = async () => {
    let errorFlag = false;
    setErrors(defaultErrors);
    setLoading(true);
    // Check for missing inputs
    if (!username.trim()) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "This field is required.",
        };
      });
      setLoading(false);
      return;
    }
    if (username.trim().length < 6) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          username: "Username must be greater than 6 characters.",
        };
      });
      errorFlag = true;
    }
    if (!validateImageURL(photoURL)) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          photoURL:
            "Image URL must be one of the following formats: gif, jpeg, tif, png, webp, bmp.",
        };
      });
      errorFlag = true;
    }
    if (!errorFlag) {
      try {
        await doUpdateUserProfile(username, photoURL);
        enqueueSnackbar(`Successfully updated your profile!.`, {
          variant: "success",
        });
        setOpenEditProfile(false);
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
      showMenuState={openEditProfile}
      setShowMenuState={setOpenEditProfile}
    >
      <ModalContent>
        <p>
          Update your user profile using the fields below. Photo must be a valid
          image url.
        </p>
        {errors.firebase && <Alert>{errors.firebase}</Alert>}
        <Form id="edit-profile-form">
          <ModalInput
            id="username"
            name={"edit-profile-username"}
            icon={<UserCircleIcon />}
            placeholder={"Enter Your New Username"}
            type="text"
            error={errors.username}
            value={username}
            handleChange={setUsername}
          />
          <ModalInput
            id="photoURL"
            name={"edit-profile-photo-url"}
            icon={<PhotoIcon />}
            placeholder={"Enter A Photo URL"}
            type="text"
            error={errors.photoURL}
            value={photoURL}
            handleChange={setPhotoURL}
          />
          <FormButton type="submit" onClick={() => handleEditProfile()}>
            <span className={loading ? "blink" : ""}>Update Profile</span>
          </FormButton>
        </Form>
      </ModalContent>
    </ModalMenu>
  );
};

export default EditProfileModal;
