import { put, call, takeEvery } from "redux-saga/effects";

import { USER_DETAILS, SET_USER_DETAILS } from "../ActionTypes";

import { putCategories } from "../api/categoryApi";

// Get Menu Items
function* setUserDetails({payload}) {

  yield put({ type: USER_DETAILS, payload });
}

export default function* userSaga() {
  yield takeEvery(SET_USER_DETAILS, setUserDetails);
}
