import defaultAxios from 'axios';


const axios = defaultAxios.create({
  headers: {'Content-Type': 'application/json'}
});

export const putCategories = async () => {
  try {
    const orders = await axios.put(`/api/categoryUpdate`);
    return orders.data
  } catch(err) {
    return console.error(err);
  }
}