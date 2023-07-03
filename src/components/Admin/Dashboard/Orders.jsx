import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Select, MenuItem, Button } from "@mui/material";
import {
  GET_ORDERITEMS_REQUESTED,
  UPDATE_ORDERITEMS,
} from "../../redux/orders/ActionTypes";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Title from "./Title";

// Generate Order Data

const orderOptions = ["New", "In-Progress", "Completed", "Invalid"];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = ({
  orders: { loading, order },
  getOrderItems,
  updateOrderStatus,
}) => {
  const [sorted, setSorted] = useState();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    console.log("how many times?",user.rId)
    async function getItDone(){
      await getOrderItems(user.rId);
    }
    getItDone();
  }, [user.rId]);

  useEffect(() => {
    let sortedOrders = order
      .filter(
        (orderItem) =>
          orderItem.status === "New" || orderItem.status === "In-Progress"
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    // Remove duplicates from sortedOrders array
    sortedOrders = sortedOrders.filter(
      (orderItem, index, self) =>
        index === self.findIndex((o) => o._id === orderItem._id)
    );

    setSorted(sortedOrders);
  }, [order]);

  const handleSelectChange = (event, orderId) => {
    // Find the selected order in the 'sorted' array
    // setSelectedOption(event.target.value)
    const updatedOrders = sorted.map((orderItem) => {
      if (orderItem._id === orderId) {
        // Update the status of the selected order
        return { ...orderItem, status: event.target.value };
      }
      return orderItem;
    });
    setSorted(updatedOrders);
    const statusChanged = updatedOrders.filter(
      (orderItem) => orderId === orderItem._id
    );
    console.log("the order status changed,", statusChanged);
    updateOrderStatus(user.rId,statusChanged[0], orderId);
    // Update the state with the updated 'sorted' array
  };

  const convertTime = (data) => {
    const utcDateTime = new Date(data);
    const istDateTime = utcDateTime.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const istDate = utcDateTime.toLocaleDateString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    const istTime = utcDateTime.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
    });
    return istTime;
  };

  //change status for the order

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Active Orders</Title>
      {loading && "Loading..."}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Table</TableCell>
            <TableCell>Order Items</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Order Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted !== undefined && sorted.length > 0
            ? sorted.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell>{convertTime(orderItem.createdAt)}</TableCell>
                  <TableCell>{orderItem.table}</TableCell>
                  <TableCell>
                    {orderItem.items.map((item) => (
                      <div key={item._id}>
                        {item.name} - {item.quantity}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={orderItem.status}
                      onChange={(event) =>
                        handleSelectChange(event, orderItem._id)
                      }
                    >
                      {orderOptions.map((option, id) => (
                        <MenuItem key={id} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">{orderItem.totalAmount}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
};

Orders.propTypes = {
  loading: PropTypes.bool,
  orders: PropTypes.array,
  getOrderItems: PropTypes.func.isRequired,
  updateOrderStatus: PropTypes.func.isRequired,
};

// Get state to props
const mapStateToProps = (state) => ({
  orders: state.order,
});

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
  getOrderItems: (id) => dispatch({ type: GET_ORDERITEMS_REQUESTED, payload: id }),
  updateOrderStatus: (rId, order, orderId) =>
    dispatch({
      type: UPDATE_ORDERITEMS,
      payload: { rId, order, orderId },
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
