import {
    put,
    call,
    takeEvery
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
function* getOrderItems() {
  yield put({ type: SET_LOADING })
  
  const orderItems = yield call(getAllOrderItems);

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
    yield takeEvery(GET_ORDERITEMS_REQUESTED, getOrderItems);
  yield takeEvery(UPDATE_ORDERITEMS, editOrder);
  }