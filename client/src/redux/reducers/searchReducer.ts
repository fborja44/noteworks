import { createReducer } from '@reduxjs/toolkit';
import { setSearchTerm } from '../actions/searchActions';

const initialState: string = '';

const searchReducer = createReducer(initialState, (builder) => {
	builder.addCase(setSearchTerm, (state, action) => {
		state = action.payload;
		return state;
	});
});

export default searchReducer;
