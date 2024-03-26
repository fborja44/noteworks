import { createReducer } from '@reduxjs/toolkit';
import { Group } from '../../common/types';
import {
	createGroup,
	deleteGroup,
	setGroups,
	updateGroup,
} from '../actions/groupsActions';

const initialState: Group[] = [];

const groupsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(setGroups, (state, action) => {
			state = action.payload;
			return state;
		})
		.addCase(createGroup, (state, action) => {
			state = [...state, action.payload];
			return state;
		})
		.addCase(updateGroup, (state, action) => {
			const updatedGroup = action.payload;
			state = state.map((group: Group) => {
				return group._id === updatedGroup._id ? updatedGroup : group;
			});
			return state;
		})
		.addCase(deleteGroup, (state, action) => {
			const groupId: string = action.payload;
			state = state.filter((note: Group) => note._id !== groupId);
			return state;
		});
});

export default groupsReducer;
