import {
    put,
    call,
    takeEvery
  } from 'redux-saga/effects';

  import {
    SET_QRCODE,
    QR_CODES
  } from '../ActionTypes';

import {
  setQRcodeNow,
  } from '../api/qrcodeApi';


  function* setQRcode({ payload }) {
    try {
      const setQR = yield call(setQRcodeNow, payload);
      // console.log("the qrode load:",setQR);
      yield put({ type: QR_CODES, payload: setQR });
    } catch (error) {
      // Handle error
    }
  }

  export default function* qrcodeSaga() {
    yield takeEvery(SET_QRCODE, setQRcode);
  }