import defaultAxios from 'axios';
import * as toast from "../../../constants/ToastConstants";
import * as notify from "../../../constants/ToastCaller";

const axios = defaultAxios.create({
  headers: {'Content-Type': 'application/json'}
});


// Get All Todos
export const getAllMenuItems = async () => {
  try {
    const menus = await axios.get(`/api/menuGet`);

    return menus.data;
  } catch(err) {
    return console.error(err)
  }
}

// Create New Todo
export const createNewMenu = async (menu) => {
  try {
    const menuData = await axios.post(`/api/menu`,menu)

    return menuData.data
  } catch(err) {
    return console.error(err)
  }
}

// Delete existed todo
export const deleteExistedMenu = async (id) => {
  try {
    const menuData =await axios.delete(`/api/menu/${id}`);
		notify.notifySuccess(toast.MenuDeleteSuccessful);
    return menuData.data
  } catch(err) {
     return console.error(err)
  }
}