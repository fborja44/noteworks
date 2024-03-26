import { createAction } from '@reduxjs/toolkit';

export const setSelectedTab = createAction(
	'SET_SELECTED_TAB',
	(selectedTab: string) => {
		return {
			payload: selectedTab,
		};
	}
);
