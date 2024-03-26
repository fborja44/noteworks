import { Checklist } from '../../common/types';
import { createAction } from '@reduxjs/toolkit';

export const setChecklists = createAction(
	'SET_CHECKLISTS',
	(checklists: Checklist[]) => {
		return {
			payload: checklists,
		};
	}
);

export const createChecklist = createAction(
	'CREATE_CHECKLIST',
	(newChecklist: Checklist) => {
		return {
			payload: newChecklist,
		};
	}
);

export const updateChecklist = createAction(
	'UPDATE_CHECKLIST',
	(updatedChecklist: Checklist) => {
		return {
			payload: updatedChecklist,
		};
	}
);

export const deleteChecklist = createAction(
	'DELETE_CHECKLIST',
	(checklistId: string) => {
		return {
			payload: checklistId,
		};
	}
);
