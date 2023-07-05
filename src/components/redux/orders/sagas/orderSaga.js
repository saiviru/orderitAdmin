import {
    put,
    call,
    takeEvery,
    takeLatest
  } from 'redux-saga/effects';

  import {
    SET_LOADING,
    ORDERITEMS,
    GET_ORDERITEMS_REQUESTED,
    EDIT_ORDER,
    UPDATE_ORDERITEMS
  } from '../ActionTypes';

import {
  getAllOrderItems,
  updateOrder
  } from '../api/orderApi';

  // Get Menu Items
function* getOrderItems({payload}) {
  yield put({ type: SET_LOADING })
  const orderItems = yield call(getAllOrderItems, payload);
    yield put({ type: ORDERITEMS, payload: orderItems })
  }

  function* editOrder({ payload }) {
    try {
      const updatedOrder = yield call(updateOrder, payload);
      console.log({payload})
      yield put({ type: EDIT_ORDER, payload: updatedOrder });
    } catch (error) {
      // Handle error if needed
    }
  }

  export default function* orderSaga() {
    yield takeLatest(GET_ORDERITEMS_REQUESTED, getOrderItems);
  yield takeEvery(UPDATE_ORDERITEMS, editOrder);
  }