import { createAction } from '@reduxjs/toolkit';
import { ChecklistItem } from '../../common/types';

export const setUnsavedItems = createAction(
	'SET_UNSAVED_ITEMS',
	(newUnsavedItems: ChecklistItem[]) => {
		return {
			payload: newUnsavedItems,
		};
	}
);

export const addUnsavedItem = createAction(
	'ADD_UNSAVED_ITEM',
	(updatedItem: ChecklistItem) => {
		return {
			payload: updatedItem,
		};
	}
);
