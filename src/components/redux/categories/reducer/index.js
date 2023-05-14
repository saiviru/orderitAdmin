import * as ACTIONTYPES from "../ActionTypes";

const INITIAL_STATE = {
  categories: [],
};

export default function categoryDetails(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONTYPES.CATEGORIES:
      console.log("the categories:", action.payload);
      return {
        ...state,
        // categories: [],
        categories: action.payload,
      };
    default:
      return state;
  }
}
