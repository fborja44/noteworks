// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { COLOR } from "../../common/color";

const ProgressContainer = styled.div`
  color: ${(props) => props.theme.main.textSecondary};
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  align-items: center;

  .label {
    margin-right: 1em;
  }
`;

const ProgressBar = styled.div`
  background: ${(props) => props.theme.title.borderColor};
  width: 400px;
  height: 8px;
`;

const ProgressBarFilled = styled.div`
  background: ${COLOR.blue.primary};
  height: 100%;
  width: 0%;

  transition: width 0.5s;
`;

interface ChecklistProgressBarProps {
  completion: number;
}

const ChecklistProgressBar = ({ completion }: ChecklistProgressBarProps) => {
  const percent = Math.ceil(completion * 100);

  return (
    <ProgressContainer>
      <div
        className="label"
        css={
          percent === 100 &&
          css`
            color: ${COLOR.green.primary};
          `
        }
      >
        Progress: {percent}%
      </div>
      <ProgressBar>
        <ProgressBarFilled
          css={css`
            width: ${percent}%;
          `}
        />
      </ProgressBar>
    </ProgressContainer>
  );
};

export default ChecklistProgressBar;
