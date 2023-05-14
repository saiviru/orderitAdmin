import defaultAxios from "axios";

const axios = defaultAxios.create({
  headers: { "Content-Type": "application/json" },
});

export const putCategories = async (options) => {
  try {
    const categories = await axios.put(`/api/categoryUpdate`, options);
    return categories.data;
  } catch (err) {
    return console.error(err);
  }
};

