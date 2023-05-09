
import { all } from 'redux-saga/effects'
// Sagas
import orderSaga from './orders/sagas/orderSaga';
import menuSaga from './menus/sagas/menuSaga';



// Export the root saga
export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield all([menuSaga(),orderSaga()])
}