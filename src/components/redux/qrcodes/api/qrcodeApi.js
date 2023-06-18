import defaultAxios from 'axios';
import * as toast from "../../../constants/ToastConstants";
import * as notify from "../../../constants/ToastCaller";

const axios = defaultAxios.create({
  headers: {'Content-Type': 'application/json'}
});

export const setQRcodeNow = async (qrcodes) => {
  try {
    const qrData = await axios.post(`/api/qrcodes`,qrcodes)
    // console.log("the qr from api:",qrData)
    return qrData.data.result
  } catch(err) {
    return console.error(err)
  }
}
