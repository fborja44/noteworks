/* Settings Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

// Component imports
import PageHeader from "../pageheader/PageHeader";
import { Empty } from "../Section";
import WrenchScrewdriverIcon from "../icons/WrenchScrewdriverIcon";
import DocumentCheckIcon from "../icons/DocumentCheckIcon";

export interface SettingsPageProps {}

const SettingsPage: React.FC<SettingsPageProps> = () => {
  return (
    <React.Fragment>
      <PageHeader title="Checklists" icon={<DocumentCheckIcon />} />
      <div className="main-content-wrapper">
        <div
          css={css`
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
              width: 50px;
              height: 50px;
              margin-top: 1.5em;
            }
          `}
        >
          <Empty>
            <p>This feature is not ready yet!</p>
            <WrenchScrewdriverIcon />
          </Empty>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SettingsPage;
