import React, { useState, useEffect, useRef } from "react";
import MiniDrawer from "../Sidebar/Sidebar";
import UploadData from "./UploadData";
import AWS from "aws-sdk";
import axios from 'axios';
import store from "../../redux/store";
import "./AddNewMenu.css";
import $ from "jquery";
import PropTypes from "prop-types";
import {
  CREATE_MENUITEMS_REQUESTED,
  MENUIMAGES,
} from "../../redux/menus/ActionTypes";
import {
  PUT_CATEGORY_REQUESTED,
  GET_CATEGORIES
} from '../../redux/categories/ActionTypes';
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

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_IAM_USER_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_IAM_USER_SECRET;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});



const AddNewMenu = ({ createMenu, updateCategories }) => {
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    document.title = "Order It - Add new item";
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/resCategories/${user.rId}`);
        const categories = response.data;
        setOptions(categories.data)
        // Further processing with the retrieved categories can be done here
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
      createMenu(menu);
      notify.notifySuccess(toast.MenuAddSuccessful);
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

  const handleUpload = (file) => {
    // Buffer.from(file,'base64');
    const folder = "josh" + "/";
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: folder + file.name,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // setProgress(Math.round((evt.loaded / evt.total) * 100))
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      setOptions((prevOptions) => [...prevOptions, newOption]);
      setNewOption("");
    }
  };

  useEffect(() => {
    updateCategories(options, user.rId);
  }, [options]);

  const handleDeleteOption = (option) => {
    setOptions((prevOptions) => prevOptions.filter((o) => o !== option));
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
        <MiniDrawer headerTitle="View Menu Items" />
        <CssBaseline />
        <Grid xs={12}>
          <h1> Add New Menu Item</h1>
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
  updateCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    images: state.images,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    images: (file) => dispatch({ type: MENUIMAGES }),
    createMenu: (menu) =>
      dispatch({ type: CREATE_MENUITEMS_REQUESTED, payload: menu }),
    updateCategories: (categories, restaurantId) =>
      dispatch({ type: PUT_CATEGORY_REQUESTED, payload: {categories,restaurantId} }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewMenu);
