import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  Box,
  FormControlLabel,
  FormLabel,
  FormControl,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { MENUIMAGES } from "../../redux/menus/ActionTypes";
import { handleUpload } from "../../../utils/s3ImageUpload";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  label: {
    fontSize: "0.75rem",
  },
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

const EditMenuModal = ({ open, item, onSave, onClose }) => {
  const [options, setOptions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  useEffect(() => {
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
  console.log({ options });

  const classes = useStyles();
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleChange = (e) => {
    setUpdatedItem({
      ...updatedItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectOption = (option) => {
    setUpdatedItem({
      ...updatedItem,
      category: option,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    console.log("the image details:", file.name);
    dispatch({ type: MENUIMAGES, payload: file });
    handleUpload(file);
    setUpdatedItem({
      ...updatedItem,
      image: file.name,
    });
  };

  const deleteImage = () => {
    setUpdatedItem({
      ...updatedItem,
      image: "",
    });
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby="edit-menu-modal"
      aria-describedby="edit-menu-modal-description"
    >
      <Box
        className={classes.modalContent}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <h2 id="edit-menu-modal">Edit Menu Item</h2>
        <TextField
          className={classes.textField}
          label="Item Name"
          name="itemName"
          value={updatedItem.itemName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={classes.textField}
          label="Description"
          name="description"
          value={updatedItem.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={classes.textField}
          label="Price"
          name="price"
          value={updatedItem.price}
          onChange={handleChange}
          fullWidth
        />
        <div>
          <input
            type="file"
            accept="image/*"
            id="upload-image-input"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
          {selectedImage ? (
            <div>
              <label htmlFor="upload-image-input">
                <Button component="span" variant="contained" color="primary">
                  Change Image
                </Button>
              </label>
              <label>
                <Button
                  component="span"
                  variant="contained"
                  color="warning"
                  onClick={deleteImage}
                >
                  Delete Image
                </Button>
              </label>
              <div>
                <p>Selected Image: {selectedImage.name}</p>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  width="50%"
                  height="50%"
                />
              </div>
            </div>
          ) : updatedItem.image ? (
            <div>
              <label htmlFor="upload-image-input">
                <Button component="span" variant="contained" color="primary">
                  Change Image
                </Button>
              </label>
              <label>
                <Button
                  component="span"
                  variant="contained"
                  color="warning"
                  onClick={deleteImage}
                >
                  Delete Image
                </Button>
              </label>
              <div>
                <p>Selected Image: {updatedItem.image}</p>
                <img
                  src={`https://foodappdata.s3.ap-south-1.amazonaws.com/josh/${updatedItem.image}`}
                  alt="Selected"
                  width="50%"
                  height="50%"
                />
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="upload-image-input">
                <Button component="span" variant="contained" color="primary">
                  Upload Image
                </Button>
              </label>
              <div>No image selected</div>
            </div>
          )}
        </div>
        <Box mb={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.label}>
              Dish Type
            </FormLabel>
            <RadioGroup
              label="Dish Type"
              id="itemType"
              name="type"
              value={updatedItem.type}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="veg"
                control={<Radio />}
                label="Veg"
                checked={updatedItem.type === "veg"}
              />
              <FormControlLabel
                value="nonveg"
                control={<Radio />}
                label="Non - Veg"
                checked={updatedItem.type === "nonveg"}
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            className={classes.label}
          >
            Category
          </Typography>
          <Box mt={1} className={classes.optionsContainer}>
            {options.map((option, index) => (
              <ListItem
                key={index}
                className={`${classes.listItem} ${
                  option === updatedItem.category ? "active" : ""
                }`}
                component="span"
                onClick={() => handleSelectOption(option)}
              >
                <ListItemText primary={option} />
              </ListItem>
            ))}
          </Box>
        </Box>
        <div className={classes.buttonContainer}>
          <Button
            color="primary"
            onClick={() => onSave(updatedItem._id, updatedItem)}
          >
            Save
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

EditMenuModal.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditMenuModal;
