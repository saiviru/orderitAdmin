import React, { useState, useEffect, useRef } from "react";
import MiniDrawer from "../Sidebar/Sidebar";
import UploadData from "./UploadData";
import AWS from "aws-sdk";
import axios from "axios";
import store from "../../redux/store";
import { useNavigate } from "react-router-dom";
import "./AddNewMenu.css";
import $ from "jquery";
import PropTypes from "prop-types";
import {
  CREATE_MENUITEMS_REQUESTED,
  MENUIMAGES,
  GET_MENUITEMS_REQUESTED,
  EDIT_MENU_REQUESTED
} from "../../redux/menus/ActionTypes";
import {
  PUT_CATEGORY_REQUESTED,
  GET_CATEGORIES,
} from "../../redux/categories/ActionTypes";
import { connect, useDispatch, useSelector } from "react-redux";
import { CssBaseline, Grid } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import * as toast from "../../constants/ToastConstants";
import * as notify from "../../constants/ToastCaller";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { handleUpload } from "../../../utils/s3ImageUpload";


$("input").on("focusin", function () {
  $(this).parent().find("label").addClass("active");
});

$("input").on("focusout", function () {
  if (!this.value) {
    $(this).parent().find("label").removeClass("active");
  }
});

const useStyles = makeStyles(() => ({
  listItem: {
    display: "inline-flex",
    alignItems: "center",
    margin: "0 8px",
    cursor: "pointer",
    "&.active": {
      fontWeight: "bold",
      backgroundColor: "yellow",
    },
  },
  optionsContainer: {
    display: "flex",
    alignItems: "center",
  },
}));

const AddNewMenu = ({
  menu: { menu },
  getMenuList,
  editMenu,
  createMenu,
  updateCategories,
}) => {
  console.log("the menu in add menu,", menu);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    getMenuList();
    document.title = "Order It - Add new item";
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

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const classes = useStyles();

  let dragArea;

  const handleMenu = (e) => {
    setName(e.target.value);
  };

  const handlesubMenu = (e) => {
    setDescription(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const addMenu = async (e) => {
    e.preventDefault();
    setImage(store.getState().menu.images);
    handleUpload(store.getState().menu.images);
    const menu = {
      itemName: name,
      description: description,
      image: store.getState().menu.images.name,
      price: parseInt(price),
      category: selectedOption,
      type: selectedType,
    };
    if (
      menu.itemName &&
      menu.itemName.length > 0 &&
      menu.description &&
      menu.description.length > 0 &&
      menu.category &&
      menu.category.length > 0 &&
      menu.type &&
      menu.type.length > 0
    ) {
      createMenu(user.rId,menu);
      notify.notifySuccess(toast.MenuAddSuccessful);
      const refreshPage = () => {
        navigate(0);
      }
      refreshPage();
      setDescription("");
      setName("");
      setPrice("");
      setImage("");
      setSelectedOption("");
      setSelectedType("");
      dispatch({ type: MENUIMAGES, payload: "" });
      dragArea = document.querySelector(".drag-area");
      dragArea.innerHTML = "";
    }
  };


  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions((prevOptions) => [...prevOptions, newOption]);
      setNewOption("");
    }
  };

  useEffect(() => {
    if (options.length > 0) {
      updateCategories(options, user.rId);
    }
  }, [options]);

  const handleDeleteOption = (option) => {
    setOptions((prevOptions) => prevOptions.filter((o) => o !== option));
    const menuItemsToUpdate = menu.filter((item) => item.category === option);

    // Update the category of menu items to make them uncategorized
    const updatedMenuItems = menu.map((item) => {
      if (menuItemsToUpdate.includes(item)) {
        return {
          ...item,
          category: null, // Assign null or another appropriate value to make it uncategorized
        };
      }
    });
    const uncategorised = updatedMenuItems.filter((menuItem) => {
      if (menuItem !== undefined && menuItem.category === null) {
        editMenu(user.rId,menuItem._id,menuItem)
        console.log("the updated menu on category delete", menuItem);
      }
    });
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    const matchingOption = options.find(
      (option) => option.toLowerCase() === value.toLowerCase()
    );
    if (matchingOption) {
      console.log("working?");
      event.preventDefault();
    }
    setNewOption(value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddOption();
    }
  };

  const handleInputFocus = () => {
    setSelectedOption("");
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <React.Fragment>
      <div className="menu">
        <MiniDrawer headerTitle="Add Menu Items" />
        <CssBaseline />
        <Grid xs={12}>
          <div className="wrap">
            <form className="form" onSubmit={addMenu}>
              <div className="contentHolder">
                <label htmlFor="itemName">Item Name</label> <br />
                <input
                  className="cool"
                  type="text"
                  id="itemName"
                  onChange={handleMenu}
                  value={name}
                />
              </div>
              <div className="contentHolder">
                <label htmlFor="itemDescription">Item Description</label> <br />
                <textarea
                  className="cool"
                  type="text"
                  id="itemDescription"
                  onChange={handlesubMenu}
                  value={description}
                ></textarea>
              </div>
              <div className="contentHolder">
                <label htmlFor="itemPrice">Item Price</label> <br />
                <input
                  className="cool"
                  type="text"
                  id="itemPrice"
                  onChange={handlePrice}
                  value={price}
                />
              </div>
              <label htmlFor="itemType">Dish Type</label> <br />
              <Box mb={3} mt={-2}>
                <RadioGroup
                  id="itemType"
                  name="type-of"
                  value={selectedType}
                  onChange={(event) => setSelectedType(event.target.value)}
                  row
                >
                  <FormControlLabel
                    value="veg"
                    control={<Radio />}
                    label="Veg"
                  />
                  <FormControlLabel
                    value="nonveg"
                    control={<Radio />}
                    label="Non - Veg"
                  />
                </RadioGroup>
              </Box>
              <label htmlFor="itemCategory">Dish Category</label> <br />
              <Box>
                <TextField
                  placeholder="Select or Add Option"
                  value={selectedOption || newOption}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  onFocus={handleInputFocus}
                  inputRef={inputRef}
                  autoComplete="off"
                />
                <Box mt={1} className={classes.optionsContainer}>
                  {options.map((option, index) => (
                    <ListItem
                      key={index}
                      className={`${classes.listItem} ${
                        option === selectedOption ? "active" : ""
                      }`}
                      component="span"
                      onClick={() => handleSelectOption(option)}
                    >
                      <ListItemText primary={option} />
                      <IconButton onClick={() => handleDeleteOption(option)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                  {newOption.trim() !== "" && !options.includes(newOption) && (
                    <ListItem className={classes.listItem} component="span">
                      <ListItemText primary={newOption} />
                      <IconButton onClick={handleAddOption}>
                        <AddIcon />
                      </IconButton>
                    </ListItem>
                  )}
                </Box>
              </Box>
              <div>
                <UploadData image={image} />
              </div>
              <div className="">
                <button type="submit" className="btn second">
                  Add Menu Item
                </button>
              </div>
            </form>
          </div>
        </Grid>
      </div>
    </React.Fragment>
  );
};

AddNewMenu.propTypes = {
  menu: PropTypes.array,
  createMenu: PropTypes.func.isRequired,
  getMenuList: PropTypes.func.isRequired,
  editMenu: PropTypes.func.isRequired,
  updateCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    images: state.images,
    menu: state.menu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    images: (file) => dispatch({ type: MENUIMAGES }),
    getMenuList: () => dispatch({ type: GET_MENUITEMS_REQUESTED }),
    createMenu: (rId,menu) =>
      dispatch({ type: CREATE_MENUITEMS_REQUESTED, payload: { rId, menu } }),
      editMenu: (rId,id, item) =>
    dispatch({ type: EDIT_MENU_REQUESTED, payload: { rId, id, item } }),
    updateCategories: (categories, restaurantId) =>
      dispatch({
        type: PUT_CATEGORY_REQUESTED,
        payload: { categories, restaurantId },
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewMenu);
