import { createAction } from '@reduxjs/toolkit';

export const setConnection = createAction(
	'SET_CONNECTED',
	(connected: boolean) => {
		return {
			payload: connected,
		};
	}
);
