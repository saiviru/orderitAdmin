import defaultAxios from 'axios';

const axios = defaultAxios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {'Content-Type': 'application/json'}
});

const baseURL= process.env.REACT_APP_URL;

export const getAllOrderItems = async () => {
  try {
    const orders = await axios.get(baseURL+'order/');
    return orders.data
  } catch(err) {
    return console.error(err);
  }
}