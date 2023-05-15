import React, { useEffect } from "react";
import ListingMenu from "./ListingMenu";
import MiniDrawer from "../Sidebar/Sidebar";
import PropTypes from "prop-types";
import {
  GET_MENUITEMS_REQUESTED,
  DELETE_MENU_REQUESTED,
} from "../../redux/menus/ActionTypes";
import { connect } from "react-redux";

const MenuList = ({
  menu: { loading, menu },
  getMenuList,
  handleEdit,
  deleteMenu,
}) => {
  useEffect(() => {
    getMenuList();
    document.title = "Order It - Add Menu";
    // eslint-disable-next-line
  }, []);

  const handleDelete = (itemId) => {
    deleteMenu(itemId)
    .then(() => getMenuList()) // Fetch updated menu list
    .catch((error) => {
      console.log(error)
    });
  };
  console.log("what is menu?", menu);
  return (
    <div>
      <MiniDrawer headerTitle="View Menu Items" />
      {loading && "Loading..."}
      {menu.map((item) => (
        <ListingMenu
          key={item._id}
          item={item}
          onEdit={handleEdit}
          onDelete={() => handleDelete(item._id)}
        />
      ))}
    </div>
  );
};

MenuList.propTypes = {
  loading: PropTypes.bool,
  menu: PropTypes.array,
  getMenuList: PropTypes.func.isRequired,
  deleteMenu: PropTypes.func.isRequired,
};

// Get state to props
const mapStateToProps = (state) => ({
  menu: state.menu,
});

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
  getMenuList: () => dispatch({ type: GET_MENUITEMS_REQUESTED }),
  deleteMenu: (id) => dispatch({ type: DELETE_MENU_REQUESTED, payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
