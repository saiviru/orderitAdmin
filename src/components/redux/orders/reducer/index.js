import * as ACTIONTYPES from '../ActionTypes';

const INITIAL_STATE = {
	order: [],
	loading: false,
};

export default function orderDetails(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONTYPES.SET_LOADING:
			return {
				...state,
				loading: true,
			};
		case ACTIONTYPES.ORDERITEMS:
			return {
				...state,
				order:[],
				order: state.order.concat(action.payload),
				loading: false,
			};
		default:
			return state;
	}
}
