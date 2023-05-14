import {
    put,
    call,
    takeEvery
  } from 'redux-saga/effects';

  import {
    SET_LOADING,
    ORDERITEMS,
    GET_ORDERITEMS_REQUESTED,
  } from '../ActionTypes';

import {
  getAllOrderItems,
  } from '../api/orderApi';

  // Get Menu Items
function* getOrderItems() {
  yield put({ type: SET_LOADING })
  
  const orderItems = yield call(getAllOrderItems);

    yield put({ type: ORDERITEMS, payload: orderItems })
  }

  export default function* orderSaga() {
    yield takeEvery(GET_ORDERITEMS_REQUESTED, getOrderItems)
  }