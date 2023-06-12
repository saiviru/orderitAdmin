import * as ACTIONTYPES from "../ActionTypes";

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
        order: [],
        order: state.order.concat(action.payload),
        loading: false,
      };
    case ACTIONTYPES.EDIT_ORDER:
      // Find the order item to update
      const updatedOrder = state.order.map((order) => {
        if (order._id === action.payload.result._id) {
          console.log("payload:", action.payload.result);
          return {
            ...order,
            ...action.payload.result,
          };
        }
        return order;
      });
      console.log("the updated order:", updatedOrder);
      return {
        ...state,
        order: updatedOrder,
      };
    default:
      return state;
  }
}
