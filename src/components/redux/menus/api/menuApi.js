import defaultAxios from 'axios'

const axios = defaultAxios.create({
  baseURL: process.env.REACT_API_URL,
  headers: {'Content-Type': 'application/json'}
});

// Get All Todos
export const getAllMenuItems = async () => {
  try {
    const menus = await axios.get('api/menuGet')

    return menus.data
  } catch(err) {
    return console.error(err)
  }
}

// Create New Todo
export const createNewMenu = async (menu) => {
  try {
    const menuData = await axios.post('api/menu',menu)

    return menuData.data
  } catch(err) {
    return console.error(err)
  }
}

// Delete existed todo
export const deleteExistedMenu = async (id) => {
  try {
    const menuData =await axios.delete(`api/menu/${id}`)
    return menuData.data
  } catch(err) {
     return console.error(err)
  }
}