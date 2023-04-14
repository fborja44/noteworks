import React, { useState, useEffect } from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import firebaseApp from "./Firebase";
import { getAuth, User } from "firebase/auth";

import GlobeIcon from "../components/icons/GlobeIcon";
import { COLOR } from "../common/color";

export const AuthContext = React.createContext<User | null>(null);

const LoadingContainer = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 12em;
    height: 12em;
    color: ${COLOR.blue.primary};
  }
`;

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getAuth(firebaseApp);
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      // Checks if authentication status changes
      setCurrentUser(user);
      setLoadingUser(false);
    });
  }, [auth]);

  if (loadingUser) {
    return (
      <LoadingContainer>
        <GlobeIcon className="blink" />
      </LoadingContainer>
    );
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
