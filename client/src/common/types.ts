export type QuickNoteT = {
    id: string,
    title: string,
    text: string,
    date: string,
    color: string,
    quicknotesList?: QuickNoteT[],
    handleDeleteNote?: (id: string) => void,
    setQuickNotes?: React.Dispatch<React.SetStateAction<QuickNoteT[]>>,
  }