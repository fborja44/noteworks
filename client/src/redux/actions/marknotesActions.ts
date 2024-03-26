import { Marknote } from '../../common/types';
import { createAction } from '@reduxjs/toolkit';

export const setMarknotes = createAction(
	'SET_MARKNOTES',
	(marknotes: Marknote[]) => {
		return {
			payload: marknotes,
		};
	}
);

export const createMarknote = createAction(
	'CREATE_MARKNOTE',
	(newMarknote: Marknote) => {
		return {
			payload: newMarknote,
		};
	}
);

export const updateMarknote = createAction(
	'UPDATE_MARKNOTE',
	(updatedMarknote: Marknote) => {
		return {
			payload: updatedMarknote,
		};
	}
);

export const deleteMarknote = createAction(
	'DELETE_MARKNOTE',
	(marknoteId: string) => {
		return {
			payload: marknoteId,
		};
	}
);
