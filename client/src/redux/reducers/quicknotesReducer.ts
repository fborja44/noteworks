import { createReducer } from '@reduxjs/toolkit';
import { Quicknote } from '../../common/types';
import {
	createQuicknote,
	deleteQuicknote,
	setQuicknotes,
	updateQuicknotes,
} from '../actions/quicknotesActions';

const initialState: Quicknote[] = [];

const quicknotesReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setQuicknotes, (state, action) => {
			state = action.payload;
			return state;
		})
		.addCase(createQuicknote, (state, action) => {
			state = [...state, action.payload];
			return state;
		})
		.addCase(updateQuicknotes, (state, action) => {
			const updatedQuicknotes = action.payload;
			const filteredQuicknotes: Quicknote[] = state.filter((note) => {
				for (const updatedNote of updatedQuicknotes) {
					if (note._id === updatedNote._id) {
						return false;
					}
				}
				return true;
			});
			state = [...updatedQuicknotes, ...filteredQuicknotes];
			return state;
		})
		.addCase(deleteQuicknote, (state, action) => {
			const quicknoteId: string = action.payload;
			state = state.filter((note: Quicknote) => note._id !== quicknoteId);
			return state;
		});
});

export default quicknotesReducer;
