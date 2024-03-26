import { createReducer } from '@reduxjs/toolkit';
import { setConnection } from '../actions/connectionActions';

const initialState: boolean = false;

const connectionReducer = createReducer(initialState, (builder) => {
	builder.addCase(setConnection, (state, action) => {
		state = action.payload;
		return state;
	});
});

export default connectionReducer;
