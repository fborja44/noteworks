import { createReducer } from '@reduxjs/toolkit';
import { Checklist } from '../../common/types';
import {
	createChecklist,
	deleteChecklist,
	setChecklists,
	updateChecklist,
} from '../actions/checklistsActions';

const initialState: Checklist[] = [];

const checklistsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setChecklists, (state, action) => {
			state = action.payload;
			return state;
		})
		.addCase(createChecklist, (state, action) => {
			state = [...state, action.payload];
			return state;
		})
		.addCase(updateChecklist, (state, action) => {
			const updatedChecklist = action.payload;
			state = state.map((checklist: Checklist) => {
				return checklist._id === updatedChecklist._id
					? updatedChecklist
					: checklist;
			});
			return state;
		})
		.addCase(deleteChecklist, (state, action) => {
			const checklistId: string = action.payload;
			state = state.filter((note: Checklist) => note._id !== checklistId);
			return state;
		});
});

export default checklistsReducer;
