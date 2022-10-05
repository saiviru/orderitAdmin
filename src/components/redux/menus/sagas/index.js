
import { spawn } from 'redux-saga/effects'
// Sagas
import watcherSaga from './menuSaga';

// Export the root saga
export default function* rootSaga() {
  console.log("Hello From Redux-Saga!");
  yield spawn(watcherSaga)
}