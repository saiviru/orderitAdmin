import defaultAxios from 'axios';
import * as toast from "../../../constants/ToastConstants";
import * as notify from "../../../constants/ToastCaller";

const axios = defaultAxios.create({
  headers: {'Content-Type': 'application/json'}
});

export const getAllOrderItems = async () => {
  try {
    const orders = await axios.get(`/api/orders`);
    return orders.data
  } catch(err) {
    return console.error(err);
  }
}

export const updateOrder = async (order) => {
  try {
    const orderStatus = await axios.put(`/api/orders/orderStatus`,order)
    notify.notifySuccess(toast.OrderStatusSuccessful)
    return orderStatus.data
  } catch(err) {
    return console.error(err)
  }
}