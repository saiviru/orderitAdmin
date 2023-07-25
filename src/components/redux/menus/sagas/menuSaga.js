import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import {
  SET_LOADING,
  MENUITEMS,
  DELETE_MENU,
  GET_MENUITEMS_REQUESTED,
  CREATE_MENUITEMS_REQUESTED,
  DELETE_MENU_REQUESTED,
  EDIT_MENU_REQUESTED, EDIT_MENU
} from "../ActionTypes";

import {
  getAllMenuItems,
  createNewMenu,
  updateMenu,
  deleteExistedMenu,
} from "../api/menuApi";

// Get Menu Items
function* getMenuItems({ payload }) {
  try {
    yield put({ type: SET_LOADING });
    const menuItems = yield call(getAllMenuItems, payload);
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

function* editMenu({ payload }) {
  try {
    const updatedMenu = yield call(updateMenu, payload);
    console.log({updatedMenu})
    yield put({ type: EDIT_MENU, payload: updatedMenu });
  } catch (error) {
    // Handle error if needed
  }
}

// Delete Menu
function* deleteMenu({ payload }) {
  console.log("the payload is here:",payload)
  try {
    yield put({ type: SET_LOADING });
    const menu = yield call(deleteExistedMenu, payload);
    console.log("the menu after delete in saga:",menu)
    yield put({ type: DELETE_MENU, payload: menu });
  } catch (e) {
    console.log(e);
  }
}

export default function* menuSaga() {
  yield takeEvery(GET_MENUITEMS_REQUESTED, getMenuItems);
  yield takeLatest(CREATE_MENUITEMS_REQUESTED, createMenu);
  yield takeEvery(EDIT_MENU_REQUESTED, editMenu);
  yield takeEvery(DELETE_MENU_REQUESTED, deleteMenu);
}
