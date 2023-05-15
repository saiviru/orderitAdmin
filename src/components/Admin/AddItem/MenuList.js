import React, { useEffect, useState } from "react";
import ListingMenu from "./ListingMenu";
import MiniDrawer from "../Sidebar/Sidebar";
import PropTypes from "prop-types";
import {
  GET_MENUITEMS_REQUESTED,
  DELETE_MENU_REQUESTED,
  EDIT_MENU_REQUESTED,
} from "../../redux/menus/ActionTypes";
import { connect } from "react-redux";
import EditMenuModal from './EditMenuModal';


const MenuList = ({
  menu: { loading, menu },
  getMenuList,
  editMenu,
  deleteMenu,
}) => {
  const [updatedMenu, setUpdatedMenu] = useState([]);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    getMenuList();
    document.title = "Order It - View Menu";
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setUpdatedMenu(menu.filter((item) => !item.deleted));
  }, [menu]);

  const handleEditItem = (itemId) => {
    setEditItemId(itemId);
  };

  const handleUpdateItem = (itemId, updatedItem) => {
    console.log("is the item updated:",updatedItem)
    editMenu(itemId, updatedItem);
    setEditItemId(null);
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
  };

  const handleDelete = (itemId) => {
    deleteMenu(itemId);
    setUpdatedMenu(updatedMenu.filter((item) => item._id !== itemId));
  };

  console.log("what is menu?", menu);
  return (
    <div>
      <MiniDrawer headerTitle="View Menu Items" />
      {loading
        ? "Loading..."
        : updatedMenu.map((item) => (
            <ListingMenu
              key={item._id}
              item={item}
              onEdit={() => handleEditItem(item._id, item)}
              onDelete={() => handleDelete(item._id)}
            />
          ))}
      {editItemId && (
        <EditMenuModal
        open={editItemId !== null}
        item={updatedMenu.find((item) => item._id === editItemId)}
        onClose={handleCancelEdit}
        onSave={handleUpdateItem}
      />
      )}
    </div>
  );
};

MenuList.propTypes = {
  loading: PropTypes.bool,
  menu: PropTypes.array,
  getMenuList: PropTypes.func.isRequired,
  editMenu: PropTypes.func.isRequired,
  deleteMenu: PropTypes.func.isRequired,
};

// Get state to props
const mapStateToProps = (state) => ({
  loading: state.menu.loading,
  menu: state.menu,
});

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
  getMenuList: () => dispatch({ type: GET_MENUITEMS_REQUESTED }),
  editMenu: (id, item) =>
    dispatch({ type: EDIT_MENU_REQUESTED, payload: { id, item } }),
  deleteMenu: (id) => dispatch({ type: DELETE_MENU_REQUESTED, payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
