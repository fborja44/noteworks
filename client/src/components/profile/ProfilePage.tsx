/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import styled from "@emotion/styled";

// Firebase
import { useContext } from "react";
import { AuthContext } from "../../firebase/AuthProvider";

// Common imports
import { COLOR } from "../../common/color";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";

// Image and icon imports
import UserIcon from "../icons/UserIcon";
import SmileIcon from "../icons/SmileIcon";
import EmailIcon from "../icons/EmailIcon";
import { doSignOut } from "../../firebase/Firebase";
import DeleteUserModal from "./DeleteUserModal";
import ChangePasswordModal from "./ChangePasswordModal";
import EditProfileModal from "../auth/EditProfileModal";
import DeleteUserNotesModal from "./DeleteUserNotesModal";

const ProfileInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1em;

  h3 {
    color: ${(props) => props.theme.main.textPrimary};
    margin: 0;
    margin-bottom: 0.4em;
    font-size: 18px;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.75em;
  }

  span {
    display: flex;
    justify-content: center;
    font-size: 12px;
  }

  button {
    height: 30px;
    background: inherit;
    border: 1px solid ${(props) => props.theme.main.textSecondary};
    border-radius: 5px;
    color: inherit;

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.main.textPrimary};
      border-color: ${(props) => props.theme.main.textPrimary};
    }
  }
`;

const ProfileImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100px;
  width: 100px;
  background: ${COLOR.blue.primary};
  color: white;
  border-radius: 1000em;
  margin-right: 0.75em;

  svg {
    width: 70px;
    height: 70px;
  }
`;

const ProfileIcon = styled.div`
  height: 100px;
  width: 100px;
  background: ${COLOR.blue.primary};
  border-radius: 1000em;
  margin-right: 0.75em;
`;

const ButtonsContainer = styled.div`
  width: 150px;
`;

const ProfilePageButton = styled.button`
  background: ${(props) => props.theme.title.backgroundSecondary};
  color: ${(props) => props.theme.title.textSecondary};
  height: 38px;
  width: 100%;
  outline: none;
  border: 0;
  font-size: 13px;
  border-radius: 5px;
  margin-right: 1.5em;
  margin-bottom: 1.5em;

  :hover {
    cursor: pointer;
    background: ${(props) => props.theme.sidebar.backgroundSecondary};
    color: ${(props) => props.theme.sidebar.textSecondary};
  }

  &.delete-account {
    background: ${COLOR.red.primary};
    color: white;

    &:hover {
      background: ${COLOR.red.secondary};
      color: white;
    }
  }
`;

/**
 * Home content renderer
 */
const ProfilePage: React.FC = () => {
  // Firebase user context hook
  const currentUser = useContext(AuthContext);

  // History hook
  const history = useHistory();

  // Delete Account modal
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);

  // Reset Password modal
  const [openChangePassword, setOpenChangePassword] = useState(false);

  // Delete All Notes modal
  const [openDeleteAllNotes, setOpenDeleteAllNotes] = useState(false);

  // Edit Profile modal
  const [openEditProfile, setOpenEditProfile] = useState(false);

  if (!currentUser) {
    // Redirect to home page
    history.push("/");
    return null;
  }

  return (
    <React.Fragment>
      <PageHeader title="My Profile" icon={<UserIcon />} />
      <div className="main-content-wrapper">
        <Section direction="row">
          {currentUser.photoURL ? (
            <ProfileImage src={currentUser.photoURL} alt="Profile Image" />
          ) : (
            <ProfileIcon>
              <SmileIcon />
            </ProfileIcon>
          )}

          <ProfileInfoContainer>
            <div>
              <h3>{currentUser.displayName}</h3>
              <span>
                <EmailIcon /> {currentUser.email}
              </span>
            </div>
            <button onClick={() => setOpenEditProfile(true)}>
              Edit Profile
            </button>
          </ProfileInfoContainer>
        </Section>
        <Section name="Account Management">
          <ButtonsContainer>
            <ProfilePageButton
              onClick={() => {
                doSignOut();
                history.push("/");
              }}
            >
              Logout
            </ProfilePageButton>
            <ProfilePageButton onClick={() => setOpenChangePassword(true)}>
              Change Password
            </ProfilePageButton>
            <ProfilePageButton onClick={() => setOpenDeleteAllNotes(true)}>
              Reset App Data
            </ProfilePageButton>
            <ProfilePageButton
              className="delete-account"
              onClick={() => setOpenDeleteAccount(true)}
            >
              Delete Account
            </ProfilePageButton>
          </ButtonsContainer>
        </Section>
      </div>
      <DeleteUserModal
        currentUser={currentUser}
        showMenuState={openDeleteAccount}
        setShowMenuState={setOpenDeleteAccount}
      />
      <ChangePasswordModal
        currentUser={currentUser}
        showMenuState={openChangePassword}
        setShowMenuState={setOpenChangePassword}
      />
      <DeleteUserNotesModal
        currentUser={currentUser}
        showMenuState={openDeleteAllNotes}
        setShowMenuState={setOpenDeleteAllNotes}
      />
      <EditProfileModal
        currentUser={currentUser}
        openEditProfile={openEditProfile}
        setOpenEditProfile={setOpenEditProfile}
      />
    </React.Fragment>
  );
};

export default ProfilePage;
