import { Group } from '../../common/types';
import { createAction } from '@reduxjs/toolkit';

export const setGroups = createAction(
	'SET_GROUPS',
	(groups: Group[]) => {
		return {
			payload: groups,
		};
	}
);

export const createGroup = createAction(
	'CREATE_GROUP',
	(newGroup: Group) => {
		return {
			payload: newGroup,
		};
	}
);

export const updateGroup = createAction(
	'UPDATE_GROUP',
	(updatedGroup: Group) => {
		return {
			payload: updatedGroup,
		};
	}
);

export const deleteGroup = createAction(
	'DELETE_GROUP',
	(groupId: string) => {
		return {
			payload: groupId,
		};
	}
);
