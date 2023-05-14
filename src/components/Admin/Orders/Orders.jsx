import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import Copyright from "../../Common/Copyright";
import MiniDrawer from "../Sidebar/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { GET_ORDERITEMS_REQUESTED } from "../../redux/orders/ActionTypes";
import PropTypes from "prop-types";

import axios from "axios";
import { connect, useDispatch } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Orders({ orders: { loading, order }, getOrderItems }) {
  // const [orders, setOrders] = React.useState([]); // Replace with your order data
  const [sortField, setSortField] = React.useState('');
  const [filterValue, setFilterValue] = React.useState('');

  const classes = useStyles();
  const dispatch = useDispatch();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  React.useEffect(() => {
    getOrderItems();
  }, []);

  // Function to handle sorting
  const handleSort = (event) => {
    setSortField(event.target.value);
  };

  // Function to handle filtering
  const handleFilter = (event) => {
    setFilterValue(event.target.value);
  };

  // Apply sorting and filtering to the orders data
  console.log("the orders :",order)
  let filteredOrders = order;
  if (sortField) {
    filteredOrders = filteredOrders.sort((a, b) => a[sortField].localeCompare(b[sortField]));
  }
  if (filterValue) {
    filteredOrders = filteredOrders.filter((order) =>
      order.customer.toLowerCase().includes(filterValue.toLowerCase())
    );
  }

  // Define columns for the DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    // Add more columns as needed
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MiniDrawer headerTitle="Order History" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}></Grid>
          <FormControl>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortField} onChange={handleSort}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="status">Status</MenuItem>
              {/* Add more sorting options as needed */}
            </Select>
          </FormControl>
          <TextField
            label="Filter by Customer"
            value={filterValue}
            onChange={handleFilter}
            style={{ marginLeft: 20 }}
          />
          <div style={{ height: 400, width: "100%", marginTop: 20 }}>
            <DataGrid rows={filteredOrders} columns={columns} pageSize={10} />
          </div>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

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
