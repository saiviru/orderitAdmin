import {
    put,
    call,
    takeLatest,
    takeEvery
  } from 'redux-saga/effects';

  import {
    SET_LOADING,
    MENUITEMS,
    DELETE_MENU,
    GET_MENUITEMS_REQUESTED,
    CREATE_MENUITEMS_REQUESTED,
    DELETE_MENU_REQUESTED
  } from '../ActionTypes';

import {
    getAllMenuItems,
    createNewMenu,
    deleteExistedMenu
  } from '../api/menuApi';

  // Get Menu Items
function* getMenuItems() {
    yield put({ type: SET_LOADING })
  
    const menuItems = yield call(getAllMenuItems);

  
    yield put({ type: MENUITEMS, payload: menuItems })
  }

  // Create Menu
function* createMenu({ payload }) {
    yield put({ type: SET_LOADING })
  
    const newMenu = yield call(createNewMenu, payload)
  
    yield put({ type: MENUITEMS, payload: newMenu })
    
  }
  
  // Delete menu
  function* deleteMenu({ payload }) {
    yield put({ type: SET_LOADING })
    const menu = yield call(deleteExistedMenu, payload)
  
    yield put({ type: DELETE_MENU, payload: menu })
  }


  export default function* menuSaga() {
    yield takeEvery(GET_MENUITEMS_REQUESTED, getMenuItems)
    yield takeLatest(CREATE_MENUITEMS_REQUESTED, createMenu)
    yield takeEvery(DELETE_MENU_REQUESTED, deleteMenu)
  }