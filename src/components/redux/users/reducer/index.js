import * as ACTIONTYPES from '../ActionTypes';

const INITIAL_STATE = {
	user: [],
};

export default function userDetails(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONTYPES.USER_DETAILS:
			return {
				...state,
				user:[],
				user: action.payload,
			};
		default:
			return state;
	}
}
