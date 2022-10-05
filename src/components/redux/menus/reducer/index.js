import * as ACTIONTYPES from '../ActionTypes';

const INITIAL_STATE = {
	images: {},
	menu: [],
	loading: false,
	user:{}
};

export default function menuDetails(state = INITIAL_STATE, action) {
	switch (action.type) {
		case ACTIONTYPES.SET_LOADING:
			return {
				...state,
				loading: true,
			};
		case ACTIONTYPES.MENUIMAGES:
			return {
				...state,
				images: action.payload,
				loading: false,
			};
		case ACTIONTYPES.MENUITEMS:
			return {
				...state,
				menu: state.menu.concat(action.payload),
				loading: false,
			};
		// Delete existed menu
		case ACTIONTYPES.DELETE_MENU:
			return {
				...state,
				menu: state.menu.filter((menu) => menu.id !== action.payload),
				loading: false,
			};
		case ACTIONTYPES.LOGGED_USER:
			return{
				...state,
				user:action.payload
			}
		default:
			return state;
	}
}
