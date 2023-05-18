import React, { useEffect, useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Select, MenuItem, Button } from "@mui/material";
import { GET_ORDERITEMS_REQUESTED } from "../../redux/orders/ActionTypes";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Title from "./Title";

// Generate Order Data

const orderOptions = ["New", "In-Progress", "completed"];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Orders = ({ orders: { loading, order }, getOrderItems }) => {
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    getOrderItems();
  }, []);

  const capitalize = (str) =>{
const str2 = str.charAt(0).toUpperCase() + str.slice(1);
return str2
  }

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let sorted = order.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

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
            ? sorted.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{convertTime(order.createdAt)}</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>
                    {order.items.map((item) => (
                      <div key={item._id}>
                        {item.name} - {item.quantity}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Select value={capitalize(order.status)} onChange={handleSelectChange}>
                      {orderOptions.map((option, id) => (
                        <MenuItem key={id} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell align="right">{order.totalAmount}</TableCell>
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
};

// Get state to props
const mapStateToProps = (state) => ({
  orders: state.order,
});

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
  getOrderItems: () => dispatch({ type: GET_ORDERITEMS_REQUESTED }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
