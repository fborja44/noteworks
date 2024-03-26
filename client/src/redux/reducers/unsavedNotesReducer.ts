import { createReducer } from '@reduxjs/toolkit';
import { Quicknote } from '../../common/types';
import {
	addUnsavedNote,
	setUnsavedNotes,
} from '../actions/unsavedNotesActions';

const initialState: Quicknote[] = [];

const unsavedNotesReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setUnsavedNotes, (state, action) => {
			state = action.payload;
			return state;
		})
		.addCase(addUnsavedNote, (state, action) => {
			const updatedNote: Quicknote = action.payload;
			let newUnsavedNotes: Quicknote[];
			if (!state.filter((item) => item._id === updatedNote._id).length) {
				// Note is not already saved; Add to list
				newUnsavedNotes = state;
				newUnsavedNotes.push(updatedNote);
			} else {
				// Note is already saved; Update in list
				newUnsavedNotes = state.map((item) => {
					return item._id === updatedNote._id ? updatedNote : item;
				});
			}
			state = newUnsavedNotes;
			return state;
		});
});
export default unsavedNotesReducer;
