/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import styled from "@emotion/styled";

// Common imports
import PageHeader from "../pageheader/PageHeader";
import { Quicknote, Marknote } from "../../common/types";
import QNComponent from "../quicknotes/QNComponent";
import MNComponentContainer from "../../containers/marknotes/MNComponentContainer";
import Section from "../Section";

// Image and icon imports
import { TiStar } from "react-icons/ti";

// Styled components
const Empty = styled.div`
  width: 100%;
`;

/**
 * Home content props
 */
export interface HomePageProps {
  quicknotes: Quicknote[];
  marknotes: Marknote[];
  handleUpdateMarknote: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote: (noteId: string) => void;
  handleUpdateQuicknote: (
    currentQuicknote: Quicknote,
    updatedQuicknote: Quicknote
  ) => void;
  handleDeleteQuicknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Home content renderer
 */
const HomePage = ({
  quicknotes,
  marknotes,
  handleUpdateMarknote,
  handleDeleteMarknote,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
  setSelectedTab,
}: HomePageProps) => {
  const favoritedQuicknotes = quicknotes
    .filter((note) => note.favorited)
    .map((note) => (
      <QNComponent
        key={note.id}
        notes={quicknotes}
        currentNote={note}
        handleUpdateQuicknote={handleUpdateQuicknote}
        handleDeleteQuicknote={handleDeleteQuicknote}
      />
    ));

  const favoritedMarknotes = marknotes
    .filter((note) => note.favorited)
    .map((note) => (
      <MNComponentContainer
        key={note.id}
        currentNote={note}
        handleUpdateMarknote={handleUpdateMarknote}
        handleDeleteMarknote={handleDeleteMarknote}
        setSelectedTab={setSelectedTab}
      />
    ));

  return (
    <React.Fragment>
      <PageHeader title="Home" />
      <div className="main-content-wrapper">
        <Section name={`Favorited Quicknotes`} icon={<TiStar />}>
          <div>
            {favoritedQuicknotes.length !== 0 ? (
              <div className="quicknotes-list">{favoritedQuicknotes}</div>
            ) : (
              <Empty className="empty">
                <p>You have no favorited quicknotes.</p>
              </Empty>
            )}
          </div>
        </Section>
        <Section name={`Favorited Marknotes`} icon={<TiStar />}>
          <div>
            {favoritedMarknotes.length !== 0 ? (
              <div className="marknotes-list">{favoritedMarknotes}</div>
            ) : (
              <Empty className="empty">
                <p>You have no favorited marknotes.</p>
              </Empty>
            )}
          </div>
        </Section>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
