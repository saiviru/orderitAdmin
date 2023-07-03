import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MiniDrawer from "../Sidebar/Sidebar";
import Copyright from "../../Common/Copyright";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Grid } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GET_ORDERITEMS_REQUESTED } from "../../redux/orders/ActionTypes";
import PropTypes from "prop-types";

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

function Orders({ getOrderItems }) {
  const [sortField, setSortField] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rawOrders, setRawOrders] = useState([]);
  const [modifiedOrders, setModifiedOrders] = useState([]);
  const [actualColumns, setActualColumns] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const order = useSelector((state) => state.order.order);
  const user = useSelector((state) => state.user.user);

  let sortedOrders = [];
  let columns = [];

  useEffect(() => {
    async function getItDone(){
      await getOrderItems(user.rId);
    }
    getItDone();
  }, [user.rId]);

  useEffect(() => {
    if (order.length > 0) {
      // Check for duplicate entries before updating the state
      const newOrders = order.filter(
        (newOrder) => !rawOrders.find((oldOrder) => oldOrder._id === newOrder._id)
      );
      if (newOrders.length > 0) {
        // Update the state with new orders
        setRawOrders((prevOrders) => [...prevOrders, ...newOrders]);
      }
    }
  }, [order]);

  useEffect(() => {
    // Filter orders based on the date range
    let filteredOrders = [...rawOrders];
    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter((order) => {
        const createdAt = new Date(order.createdAt);
        const start = new Date(startDate);
        const end = new Date(endDate);
        createdAt.setHours(0, 0, 0, 0);
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);
        return createdAt >= start && createdAt <= end;
      });
    }

    // Apply sorting to the orders data
    sortedOrders = [...filteredOrders];
    sortedOrders = sortedOrders.filter((orderItem) => orderItem.status !== "Invalid");
    sortedOrders = sortedOrders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    sortedOrders = sortedOrders.map((order, index) => ({
      ...order,
      id: index + 1,
    }));
    if (sortField === "status") {
      sortedOrders.sort((a, b) => a.status.localeCompare(b.status));
    } else if (sortField === "totalAmount") {
      sortedOrders.sort((a, b) => a.totalAmount - b.totalAmount);
    } else if (sortField === "name") {
      sortedOrders.sort((a, b) => a.items[0].name.localeCompare(b.items[0].name));
    }

     columns = [
      { field: "id", headerName: "ID", width: 100 },
      {
        field: "createdAt",
        headerName: "Date",
        width: 200,
        renderCell: (params) => {
          const dateTime = params.value;
          const { istTime, istDate } = convertTime(dateTime);
          return (
            <span>
              {istDate}, {istTime}
            </span>
          );
        },
      },
      {
        field: "items",
        headerName: "Items",
        width: 400,
        renderCell: (params) => {
          const items = params.value;
          return (
            <>
              {items.map((item, index) => (
                <span key={item._id} style={{ marginRight: "6px" }}>
                  {item.name} - {item.quantity}
                  {index < items.length - 1 && ","}
                </span>
              ))}
            </>
          );
        },
      },
      { field: "status", headerName: "Status", width: 150 },
      { field: "totalAmount", headerName: "Total", width: 150 },
      // Add more columns as needed
    ];
    console.log("the sorted Orders after id",sortedOrders, columns)

    setModifiedOrders(sortedOrders);
    setActualColumns(columns);
  }, [rawOrders, sortField, startDate, endDate, order]);


  // Function to handle sorting
  const handleSort = (event) => {
    setSortField(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
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
    return { istTime, istDate };
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MiniDrawer headerTitle="Order History" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container
          maxWidth="lg"
          className={classes.container}
          style={{ marginTop: "26px" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl style={{ minWidth: "160px" }}>
                <InputLabel>Sort By</InputLabel>
                <Select value={sortField} onChange={handleSort}>
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="id">ID</MenuItem>
                  <MenuItem value="totalAmount">Total</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: { minWidth: "160px" },
                }}
                style={{ marginLeft: 20 }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  style: { minWidth: "160px" },
                }}
                style={{ marginLeft: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ height: 400, width: "100%", marginTop: 20, minWidth: 800 }}
              >
                <DataGrid
                  rows={modifiedOrders}
                  columns={actualColumns}
                  pageSize={10}
                  getRowId={(row) => row.id}
                />
              </div>
            </Grid>
          </Grid>
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
  getOrderItems: (id) =>
    dispatch({ type: GET_ORDERITEMS_REQUESTED, payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
