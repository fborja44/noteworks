import { Quicknote } from '../../common/types';
import { createAction } from '@reduxjs/toolkit';

export const setQuicknotes = createAction(
	'SET_QUICKNOTES',
	(quicknotes: Quicknote[]) => {
		return {
			payload: quicknotes,
		};
	}
);

export const createQuicknote = createAction(
	'CREATE_QUICKNOTE',
	(newQuicknote: Quicknote) => {
		return {
			payload: newQuicknote,
		};
	}
);

export const updateQuicknotes = createAction(
	'UPDATE_QUICKNOTES',
	(updatedQuicknotes: Quicknote[]) => {
		return {
			payload: updatedQuicknotes,
		};
	}
);

export const deleteQuicknote = createAction(
	'DELETE_QUICKNOTE',
	(quicknoteId: string) => {
		return {
			payload: quicknoteId,
		};
	}
);
