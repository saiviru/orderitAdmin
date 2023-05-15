import { put, call, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  SET_LOADING,
  MENUITEMS,
  DELETE_MENU,
  GET_MENUITEMS_REQUESTED,
  CREATE_MENUITEMS_REQUESTED,
  DELETE_MENU_REQUESTED
} from '../ActionTypes';

import { getAllMenuItems, createNewMenu, deleteExistedMenu } from '../api/menuApi';

// Get Menu Items
function* getMenuItems() {
  try {
    yield put({ type: SET_LOADING });
    const menuItems = yield call(getAllMenuItems);
    yield put({ type: MENUITEMS, payload: menuItems });
  } catch (error) {
    // Handle error
  }
}

// Create Menu
function* createMenu({ payload }) {
  try {
    yield put({ type: SET_LOADING });
    const newMenu = yield call(createNewMenu, payload);
    yield put({ type: MENUITEMS, payload: newMenu });
  } catch (error) {
    // Handle error
  }
}

// Delete Menu
function* deleteMenu({ payload }) {
  try {
    yield put({ type: SET_LOADING });
    yield call(deleteExistedMenu, payload);
    yield put({ type: GET_MENUITEMS_REQUESTED });
  } catch (error) {
    // Handle error
  }
}



export default function* menuSaga() {
  yield takeEvery(GET_MENUITEMS_REQUESTED, getMenuItems);
  yield takeLatest(CREATE_MENUITEMS_REQUESTED, createMenu);
  yield takeEvery(DELETE_MENU_REQUESTED, deleteMenu);
}
