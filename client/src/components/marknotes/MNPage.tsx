/* Marknotes Main Content Component
------------------------------------------------------------------------------*/
// React imports
import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { nanoid } from "nanoid";

// Common imports
import { Marknote } from "../../common/types";
import { COLOR } from "../../common/color";

// Component imports
import MNHelp from "./MNHelp";
import MNEditor from "./MNEditor";
import Preview from "./MNPreview";
import PageHeaderButton from "../pageheader/PageHeaderButton";
import PageHeader from "../pageheader/PageHeader";
import Section from "../Section";

import MNComponentContainer from "../../containers/marknotes/MNComponentContainer";

// Image and icon impaorts
import { RiAddLine } from "react-icons/ri";
import { MdHelpOutline } from "react-icons/md";

/**
 * Props for MNPage
 */
export interface MNPageProps {
  marknotes: Marknote[];
  setMarknotes: React.Dispatch<React.SetStateAction<any[]>>;
  handleUpdateMarknote: (
    currentMarknote: Marknote,
    updatedMarknote: Marknote
  ) => void;
  handleDeleteMarknote: (noteId: string) => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Content for marknotes route
 */
const MNPage = ({
  marknotes,
  setMarknotes,
  handleUpdateMarknote,
  handleDeleteMarknote,
  setSelectedTab,
}: MNPageProps) => {
  // Redirect state
  const [redirect, setRedirect] = useState(<></>);

  /**
   * Marknote function to add a new empty marknote to the list
   */
  const handleAddMarknote = () => {
    // Add new to state list
    const newMarknote = {
      type: "marknote",
      id: nanoid(),
      title: "",
      body: "",
      lastModified: Date.now(),
      color: COLOR.GREY_DARK,
      favorited: false,
    };

    setMarknotes([...marknotes, newMarknote]);

    // Redirect when new note is added
    setRedirect(<Redirect to={`/marknotes/${newMarknote.id}`} />);
  };

  // Help menu state
  const [showMNHelp, setShowMNHelp] = useState(false);
  const openMNHelp = () => {
    setShowMNHelp((prev) => !prev);
  };

  /**
   * State for marknotes search text
   */
  const [MNSearchText, setMNSearchText] = useState("");

  // Sort notes in descending order from last modifed date
  const sortedMarknotes = marknotes.sort(
    (a: Marknote, b: Marknote) => b.lastModified - a.lastModified
  );

  // Filter notes
  const filteredMarknotes = sortedMarknotes.filter(
    (note: Marknote) =>
      note.title.toLowerCase().includes(MNSearchText.toLowerCase()) ||
      note.body.toLowerCase().includes(MNSearchText.toLowerCase())
  );

  let notes_list = (
    <div className="marknotes-list">
      {filteredMarknotes.map((note) => (
        <MNComponentContainer
          key={note.id}
          currentNote={note}
          handleUpdateMarknote={handleUpdateMarknote}
          handleDeleteMarknote={handleDeleteMarknote}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </div>
  );

  const searchEmpty = (
    <div className="empty">
      <p>{`No notes found for the search term "${MNSearchText}".`}</p>
    </div>
  );

  return (
    <Switch>
      <Route exact path="/marknotes">
        <PageHeader
          title="Marknotes"
          useSearch={true}
          setSearchText={setMNSearchText}
        >
          <PageHeaderButton title="New Note" onClick={handleAddMarknote}>
            <RiAddLine />
          </PageHeaderButton>
          <PageHeaderButton title="New Note" onClick={openMNHelp}>
            <MdHelpOutline />
          </PageHeaderButton>
        </PageHeader>
        <div className="main-content-wrapper">
          <Section name="My Marknotes">
            {marknotes.length !== 0 ? (
              notes_list
            ) : (
              <div className="empty">
                <p>You have no saved marknotes.</p>
                <p>
                  Create one now by pressing the + button in the menu above!
                </p>
              </div>
            )}
            {marknotes.length !== 0 &&
              filteredMarknotes.length === 0 &&
              searchEmpty}
          </Section>
          {redirect}
        </div>
        <MNHelp showMNHelp={showMNHelp} setShowMNHelp={setShowMNHelp} />
      </Route>
      {/** Routes for Editors */}
      {marknotes.map((note) => (
        <Route key={note.id} path={`/marknotes/${note.id}`}>
          <MNEditor
            currentNote={note}
            handleDeleteMarknote={handleDeleteMarknote}
            handleUpdateMarknote={handleUpdateMarknote}
            setRedirect={setRedirect}
          />
        </Route>
      ))}
      {/** Routes for Previews */}
      {marknotes.map((note) => (
        <Route key={note.id} path={`/marknotes/${note.id}`}>
          <Preview currentNote={note} />
        </Route>
      ))}
    </Switch>
  );
};

export default MNPage;
