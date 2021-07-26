/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";
import styled from "@emotion/styled";

// Common imports
import { Quicknote, Marknote } from "../../common/types";
import QNComponent from "../quicknotes/QNComponent";
import MNComponent from "../marknotes/MNComponent";

// Styled components
const SectionContainer = styled.section`
  margin-bottom: 1em;
`;

const SectionHeader = styled.div`
  border-bottom: solid 1px #5f5f5f;
  margin-bottom: 1em;
`;

const SectionTitle = styled.h1`
  margin: 0 0 0.5em 0;
  font-size: 16px;
  font-weight: 700;
  color: #4f4f4f;
`;

const Empty = styled.div`
  width: 100%;
`;

/**
 * Home content props
 */
export interface HomeContentProps {
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
const HomeContent = ({
  quicknotes,
  marknotes,
  handleUpdateMarknote,
  handleDeleteMarknote,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
  setSelectedTab,
}: HomeContentProps) => {
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
      <MNComponent
        key={note.id}
        currentNote={note}
        handleUpdateMarknote={handleUpdateMarknote}
        handleDeleteMarknote={handleDeleteMarknote}
        setSelectedTab={setSelectedTab}
      />
    ));

  return (
    <React.Fragment>
      <section className="sub-header">
        <h1>Home</h1>
      </section>
      <div className="main-content-wrapper">
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Favorited Quicknotes</SectionTitle>
          </SectionHeader>
          <div>
            {favoritedQuicknotes.length !== 0 ? (
              <div className="quicknotes-list">{favoritedQuicknotes}</div>
            ) : (
              <Empty className="empty">
                <p>You have no favorited quicknotes.</p>
              </Empty>
            )}
          </div>
        </SectionContainer>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Favorited Marknotes</SectionTitle>
          </SectionHeader>
          <div>
            {favoritedMarknotes.length !== 0 ? (
              <div className="marknotes-list">{favoritedMarknotes}</div>
            ) : (
              <Empty className="empty">
                <p>You have no favorited marknotes.</p>
              </Empty>
            )}
          </div>
        </SectionContainer>
      </div>
    </React.Fragment>
  );
};

export default HomeContent;
