import React, { useEffect, useState } from "react";
import ListingMenu from "./ListingMenu";
import MiniDrawer from "../Sidebar/Sidebar";
import PropTypes from "prop-types";
import {
  GET_MENUITEMS_REQUESTED,
  DELETE_MENU_REQUESTED,
  EDIT_MENU_REQUESTED,
} from "../../redux/menus/ActionTypes";
import axios from "axios";
import { connect } from "react-redux";
import EditMenuModal from "./EditMenuModal";
import { Box, Select, MenuItem } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const MenuList = ({
  menu: { loading, menu },
  getMenuList,
  editMenu,
  deleteMenu,
}) => {
  const [updatedMenu, setUpdatedMenu] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    getMenuList();
    document.title = "Order It - View Menu";
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/resCategories/${user.rId}`);
        const categories = response.data;
        setOptions(categories.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      // Show all menu items if no category is selected
      setUpdatedMenu(menu.filter((item) => !item.deleted));
    } else if (selectedCategory === "None") {
      // Filter menu items based on selected category
      setUpdatedMenu(menu.filter((item) => item.category === null));
    } else {
      // Filter menu items based on selected category
      setUpdatedMenu(menu.filter((item) => item.category === selectedCategory));
    }
  }, [menu, selectedCategory]);

  const handleEditItem = (itemId) => {
    setEditItemId(itemId);
  };

  const handleUpdateItem = (itemId, updatedItem) => {
    console.log("is the item updated:", updatedItem);
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

  // on select categories
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  console.log("what is menu?", menu);
  return (
    <div>
      <MiniDrawer headerTitle="View Menu Items" />
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <span style={{margin: "0 15px"}}>Select Category</span>
        {options && (
          <Select
            value={selectedCategory}
            onChange={handleClick}
            style={{ marginBottom: "10px" }}
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="None">No Category</MenuItem>
            {options.map((option, key) => (
              <MenuItem key={key} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        )}
      </Typography>
      {loading
        ? "Loading..."
        : updatedMenu.map((item) => (
            <Box
              display="grid"
              gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
              gap={2}
            >
              <ListingMenu
                key={item._id}
                item={item}
                onEdit={() => handleEditItem(item._id, item)}
                onDelete={() => handleDelete(item._id)}
              />
            </Box>
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
