import { createReducer } from '@reduxjs/toolkit';
import { setSelectedTab } from '../actions/selectedTabActions';

const initialState: string = '/';

const selectedTabReducer = createReducer(initialState, (builder) => {
	builder.addCase(setSelectedTab, (state, action) => {
		state = action.payload;
		return state;
	});
});

export default selectedTabReducer;
