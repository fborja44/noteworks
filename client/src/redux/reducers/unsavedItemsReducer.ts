import { createReducer } from '@reduxjs/toolkit';
import { ChecklistItem } from '../../common/types';
import {
	addUnsavedItem,
	setUnsavedItems,
} from '../actions/unsavedItemsActions';

const initialState: ChecklistItem[] = [];

const unsavedItemsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setUnsavedItems, (state, action) => {
			state = action.payload;
			return state;
		})
		.addCase(addUnsavedItem, (state, action) => {
			const updatedItem: ChecklistItem = action.payload;
			let newUnsavedItems: ChecklistItem[];
			if (!state.filter((item) => item._id === updatedItem._id).length) {
				// Item is not already saved; Add to list
				newUnsavedItems = state;
				newUnsavedItems.push(updatedItem);
			} else {
				// Item is already saved; Update in list
				newUnsavedItems = state.map((item) => {
					return item._id === updatedItem._id ? updatedItem : item;
				});
			}
			state = newUnsavedItems;
			return state;
		});
});

export default unsavedItemsReducer;
