import defaultAxios from 'axios';
import * as toast from "../../../constants/ToastConstants";
import * as notify from "../../../constants/ToastCaller";

const axios = defaultAxios.create({
  headers: {'Content-Type': 'application/json'}
});


// Get All Todos
export const getAllMenuItems = async (id) => {
  try {
    const menus = await axios.get(`/api/getMenu/${id}`);
    console.log("the menus return", menus)

    return menus.data.data;
  } catch(err) {
    return console.error(err)
  }
}

// Create New Menu
export const createNewMenu = async (menu) => {
  try {
    const menuData = await axios.post(`/api/createMenu`,menu)

    return menuData.data
  } catch(err) {
    return console.error(err)
  }
}

//Edit current Menu
export const updateMenu = async (menu) => {
  try {
    const menuData = await axios.put(`/api/editMenu`,menu)
    notify.notifySuccess(toast.MenuUpdateSuccessful)
    console.log("the menu on update:",menuData.data)
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