/* Home Content Component
------------------------------------------------------------------------------*/
// React imports
import React from "react";

// Common imports
import PageHeader from "../pageheader/PageHeader";
import { Quicknote, Marknote } from "../../common/types";
import Section from "../Section";
import QNList from "../quicknotes/QNList";
import MNList from "../marknotes/MNList";

// Image and icon imports
import { TiStar } from "react-icons/ti";

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
const HomePage: React.FC<HomePageProps> = ({
  quicknotes,
  marknotes,
  handleUpdateMarknote,
  handleDeleteMarknote,
  handleUpdateQuicknote,
  handleDeleteQuicknote,
  setSelectedTab,
}) => {
  return (
    <React.Fragment>
      <PageHeader title="Home" />
      <div className="main-content-wrapper">
        <Section name={`Favorited Quicknotes`} icon={<TiStar />}>
          <QNList
            quicknotes={quicknotes}
            favorites={true}
            handleUpdateQuicknote={handleUpdateQuicknote}
            handleDeleteQuicknote={handleDeleteQuicknote}
          />
        </Section>
        <Section name={`Favorited Marknotes`} icon={<TiStar />}>
          <MNList
            marknotes={marknotes}
            favorites={true}
            handleUpdateMarknote={handleUpdateMarknote}
            handleDeleteMarknote={handleDeleteMarknote}
            setSelectedTab={setSelectedTab}
          />
        </Section>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
