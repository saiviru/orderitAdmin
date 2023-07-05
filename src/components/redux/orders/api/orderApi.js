import defaultAxios from 'axios';
import * as toast from "../../../constants/ToastConstants";
import * as notify from "../../../constants/ToastCaller";

const axios = defaultAxios.create({
  headers: {'Content-Type': 'application/json'}
});

export const getAllOrderItems = async (id) => {
  try {
    console.log("the api call,",id)
    const orders = await axios.get(`/api/getOrder/${id}`);
    return orders.data.data;
  } catch(err) {
    return console.error(err);
  }
}

export const updateOrder = async (order) => {
  try {
    const orderStatus = await axios.put(`/api/updateOrderStatus`,order)
    notify.notifySuccess(toast.OrderStatusSuccessful)
    return orderStatus.data
  } catch(err) {
    return console.error(err)
  }
}