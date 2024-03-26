import { createAction } from '@reduxjs/toolkit';
import { Quicknote } from '../../common/types';

export const setUnsavedNotes = createAction(
	'SET_UNSAVED_NOTES',
	(newUnsavedNotes: Quicknote[]) => {
		return {
			payload: newUnsavedNotes,
		};
	}
);

export const addUnsavedNote = createAction(
	'ADD_UNSAVED_NOTE',
	(updatedNote: Quicknote) => {
		return {
			payload: updatedNote,
		};
	}
);
