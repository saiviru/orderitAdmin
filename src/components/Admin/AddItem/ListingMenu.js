import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const MenuItem = ({  item, onEdit, onDelete }) => {
  const { itemName, description, price, image, category, type, date } = item;

  return (
    <Card>
      <CardMedia
        component="img"
        alt={itemName}
        height="140"
        image={'https://foodappdata.s3.ap-south-1.amazonaws.com/josh/' + image}
        title={itemName}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {itemName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Price: {price}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Category: {category}
        </Typography>
        {type && (
          <Typography variant="body2" color="textSecondary" component="p">
            Type: {type}
          </Typography>
        )}
        <Typography variant="body2" color="textSecondary" component="p">
          Date: {new Date(date).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onEdit(item)}>
          Edit
        </Button>
        <Button size="small" color="secondary" onClick={() => onDelete(item._id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MenuItem;
