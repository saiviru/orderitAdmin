import { all } from "redux-saga/effects";
// Sagas
import orderSaga from "./orders/sagas/orderSaga";
import menuSaga from "./menus/sagas/menuSaga";
import categorySaga from "./categories/sagas/categorySaga";
import userSaga from "./users/sagas/userSaga";
import qrcodeSaga from './qrcodes/sagas/qrcodeSaga'

// Export the root saga
export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield all([menuSaga(), orderSaga(), categorySaga(), userSaga(), qrcodeSaga()]);
}
