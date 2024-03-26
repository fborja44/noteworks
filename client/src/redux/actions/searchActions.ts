import { createAction } from '@reduxjs/toolkit';

export const setSearchTerm = createAction(
	'SET_SEARCH_TERM',
	(searchTerm: string) => {
		return {
			payload: searchTerm,
		};
	}
);
