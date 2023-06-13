import * as ACTIONTYPES from "../ActionTypes";

const INITIAL_STATE = {
  images: {},
  menu: [],
  loading: false,
  user: {},
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
        menu: action.payload,
        loading: false,
      };
    case ACTIONTYPES.EDIT_MENU:
      // Find the menu item to update
      const updatedMenu = state.menu.map((item) => {
		  if (item._id === action.payload.result._id) {
			console.log("payload:",action.payload.result)
          return {
            ...item,
            ...action.payload.result,
          };
        }
        return item;
      });
	  console.log("the updated menu:",updatedMenu);
      return {
        ...state,
        menu: updatedMenu,
      };
    // Delete existed menu
    case ACTIONTYPES.DELETE_MENU:
      const deletedItemId = action.payload;
      return {
        ...state,
        menu: state.menu.filter((item) => item._id !== deletedItemId._id),
        loading: false,
      };
    case ACTIONTYPES.LOGGED_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
