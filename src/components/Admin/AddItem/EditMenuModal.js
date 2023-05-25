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
  Typography
} from "@material-ui/core";
import { useSelector } from "react-redux";

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
  const user = useSelector((state) => state.user.user);

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

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={onClose}
      aria-labelledby="edit-menu-modal"
      aria-describedby="edit-menu-modal-description"
    >
      <div className={classes.modalContent}>
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
          <Typography variant="subtitle1" component="div" gutterBottom className={classes.label}>
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
      </div>
    </Modal>
  );
};

EditMenuModal.propTypes = {
  open: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditMenuModal;
