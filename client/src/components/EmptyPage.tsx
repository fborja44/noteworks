// React import
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { Empty } from "./Section";
import { useLocation } from "react-router-dom";

const ContentContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 50px !important;
    height: 50px !important;
    margin-top: 1.5em !important;
  }
`;

const NotFoundPage = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) => {
  const path = useLocation().pathname;
  console.log(path);

  return (
    <ContentContainer>
      <Empty>
        <p>{children}</p>
        {icon}
      </Empty>
    </ContentContainer>
  );
};

export default NotFoundPage;
