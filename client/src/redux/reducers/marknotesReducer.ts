import { createReducer } from '@reduxjs/toolkit';
import { Marknote } from '../../common/types';
import { createMarknote, deleteMarknote, setMarknotes, updateMarknote } from '../actions/marknotesActions';

const initialState: Marknote[] = [];

const marknotesReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setMarknotes, (state, action) => {
			state = action.payload;
			return state;
		})
		.addCase(createMarknote, (state, action) => {
			state = [...state, action.payload];
			return state;
		})
		.addCase(updateMarknote, (state, action) => {
			const updatedMarknote = action.payload;
			state = state.map((marknote: Marknote) => {
				return marknote._id === updatedMarknote._id ? updatedMarknote : marknote;
			});
			return state;
		})
		.addCase(deleteMarknote, (state, action) => {
			const marknoteId: string = action.payload;
			state = state.filter((note: Marknote) => note._id !== marknoteId);
			return state;
		});
});

export default marknotesReducer;
