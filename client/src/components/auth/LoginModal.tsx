/* Searchbar Component
------------------------------------------------------------------------------*/
// React import
import React from "react";
import { useHistory } from "react-router-dom";

import styled from "@emotion/styled";

// Redux imports
import { useDispatch } from "react-redux";

// Common imports
import { COLOR } from "../../common/color";

// Component Imports
import ModalMenu from "../menus/ModalMenu";
import { enqueueSnackbar } from "notistack";
import UserIcon from "../icons/UserIcon";

const MenuContent = styled.div`
  text-align: center;

  p {
    font-size: 14px;
    padding-bottom: 1em;
  }
`;

const LoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto 0 auto;
  width: 200px;
  background-color: ${COLOR.red.primary};
  border: 1px solid ${(props) => props.theme.main.borderColor};
  color: white;
  height: 28px;
  border-radius: 8px;
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

export interface LoginModalProps {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal: React.FC<LoginModalProps> = ({ openLogin, setOpenLogin }) => {
  // History
  const history = useHistory();

  return (
    <ModalMenu
      heading={"Login to Existing Account"}
      icon={<UserIcon />}
      showMenuState={openLogin}
      setShowMenuState={setOpenLogin}
    >
      <MenuContent>
        <p>Enter your login info below to access your account.</p>
      </MenuContent>
    </ModalMenu>
  );
};

export default LoginModal;
