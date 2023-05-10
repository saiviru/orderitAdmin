import defaultAxios from 'axios';


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