import * as ACTIONTYPES from "../ActionTypes";

const INITIAL_STATE = {
  qrCodes: [],
};

export default function QRcodes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ACTIONTYPES.QR_CODES:
      return {
        ...state,
        qrCodes: state.qrCodes.concat(action.payload),
      };
    default:
      return state;
  }
}
