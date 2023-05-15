import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const EditMenuModal = ({ open, item, onSave, onClose }) => {
  const classes = useStyles();
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleChange = (e) => {
    setUpdatedItem({
      ...updatedItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Dispatch an action to save the updatedItem
    // You can implement this based on your Redux flow
    // For simplicity, let's assume there's an action called 'saveEditedMenu'
    // and it will handle saving the updatedItem

    // Call the action here with the updatedItem
    // saveEditedMenu(updatedItem);

    // Close the modal
    onClose();
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
        <TextField
          className={classes.textField}
          label="Category"
          name="category"
          value={updatedItem.category}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          className={classes.textField}
          label="Type"
          name="type"
          value={updatedItem.type}
          onChange={handleChange}
          fullWidth
        />
        <div className={classes.buttonContainer}>
          <Button color="primary" onClick={() => onSave(updatedItem._id, updatedItem)}>
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
