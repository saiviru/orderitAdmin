import { put, call, takeEvery } from "redux-saga/effects";

import { CATEGORIES, PUT_CATEGORY_REQUESTED, GET_CATEGORIES } from "../ActionTypes";

import { putCategories, getCategory } from "../api/categoryApi";

// Get Menu Items
function* putCategoryItems({ payload }) {
  const orderItems = yield call(putCategories, payload);

  // yield put({ type: CATEGORIES, payload: orderItems });
}

export default function* categorySaga() {
  yield takeEvery(PUT_CATEGORY_REQUESTED, putCategoryItems);
}
