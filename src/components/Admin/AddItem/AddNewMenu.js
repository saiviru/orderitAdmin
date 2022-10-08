import React, { useState, useEffect } from "react";
import MiniDrawer from "../Sidebar/Sidebar";
import UploadData from "./UploadData";
import AWS from "aws-sdk";
import store from "../../redux/store";
import "./AddNewMenu.css";
import $ from "jquery";
import PropTypes from "prop-types";
import {
  CREATE_MENUITEMS_REQUESTED,
  MENUIMAGES,
} from "../../redux/menus/ActionTypes";
import { connect, useDispatch } from "react-redux";
import { CssBaseline, Grid } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import * as toast from "../../constants/ToastConstants";
import * as notify from "../../constants/ToastCaller";

$("input").on("focusin", function () {
  $(this).parent().find("label").addClass("active");
});

$("input").on("focusout", function () {
  if (!this.value) {
    $(this).parent().find("label").removeClass("active");
  }
});

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

const AddNewMenu = ({ createMenu }) => {
  useEffect(() => {
    document.title = "Order It - Add new item";
    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
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
    console.log("the store at a glance:", store.getState().menu.images);
    handleUpload(store.getState().menu.images);
    const menu = {
      itemName: name,
      description: description,
      image: store.getState().menu.images.name,
      price: parseInt(price),
    };
    if (
      menu.itemName &&
      menu.itemName.length > 0 &&
      menu.description &&
      menu.description.length > 0
    ) {
      notify.notifySuccess(toast.MenuAddSuccessful);
      console.log("the menu items before sending:", menu);
      createMenu(menu);
      setDescription("");
      setName("");
      setPrice("");
      setImage("");
      dispatch({ type: MENUIMAGES, payload: "" });
      dragArea = document.querySelector(".drag-area");
      dragArea.innerHTML = "";
    }
  };

  const handleUpload = (file) => {
    // Buffer.from(file,'base64');
    console.log("into file upload:", file);
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewMenu);
