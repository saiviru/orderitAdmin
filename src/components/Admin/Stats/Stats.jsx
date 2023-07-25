import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import {
    GET_ORDERITEMS_REQUESTED,
} from "../../redux/orders/ActionTypes";
import MiniDrawer from "../Sidebar/Sidebar";
import Copyright from "../../Common/Copyright";
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { Typography } from '@mui/material';




const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      width:'100%'
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
      height: 540,
    },
  }));


const Stats = ({ orders: { loading, order }, getOrderItems }) => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [orderData, setOrderData] = useState([]);
    const [data, setData] = useState();
    const [orderDetails, setorderDetails] = useState();
    let dataTotals = [];
    let todaysOrders = [];
    const currentDate = new Date();

    const user = useSelector((state) => state.user.user);
    useEffect(() => {
        async function getItDone() {
            await getOrderItems(user.rId);
        }
        getItDone();
    }, [user.rId]);

    useEffect(() => {
        let sortedOrders = order
            .filter(
                (orderItem) =>
                    orderItem.status !== "Invalid"
            )
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Remove duplicates from sortedOrders array
        sortedOrders = sortedOrders.filter(
            (orderItem, index, self) =>
                index === self.findIndex((o) => o._id === orderItem._id)
        );
        setorderDetails(sortedOrders);
    }, [order]);

    useEffect(() => {
        if (orderDetails && orderDetails.length > 0) {
            orderDetails.map((order) => {
                const dateObject = new Date(order.createdAt);
                if (dateObject.toDateString() === currentDate.toDateString()) {
                    todaysOrders.push(order);
                }
            })
            setOrderData(todaysOrders);
        }
    }, [orderDetails]);

    useEffect(() => {
        if (orderData && orderData.length > 0) {

            const ordersByHour = orderData.reduce((result, order) => {
                const createdAt = new Date(order.createdAt);
                const hour = createdAt.getHours();
                const hour12 = (hour % 12) || 12; // Convert hour to 12-hour format
                const amPm = hour < 12 ? 'am' : 'pm'; // Determine if it's AM or PM

                const key = `${hour12}${amPm}`; // Create a key combining hour and AM/PM

                if (!result[key]) {
                    result[key] = {
                        orders: [],
                        totalAmount: 0
                    };
                }

                result[key].orders.push(order);
                result[key].totalAmount += order.totalAmount;
                return result;
            }, {});

            // Arrange orders based on labels
            const arrangedOrders = Rawdata.labels.map(label => {
                const { orders, totalAmount } = ordersByHour[label] || { orders: [], totalAmount: 0 };

                return {
                    label,
                    orders,
                    totalAmount
                };
            });

            dataTotals = arrangedOrders.map(order => order.totalAmount);
            Rawdata.datasets[0].data = dataTotals;
            setData(Rawdata);
        }
    }, [orderData]);



    let Rawdata = {
        labels: ['11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm', '12am'],
        datasets: [
            {
                label: 'Day wise sales',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <MiniDrawer headerTitle="Stats" />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container
                    maxWidth="lg"
                    className={classes.container}
                    style={{ marginTop: "26px" }}
                >
                    <Grid container justifyContent='center'>
                        <Grid item xs={12} md={8} lg={9} justifyContent="center">
                            {/* <Typography variant="h6" align="center">Hour wise sales</Typography> */}
                            <Paper className={fixedHeightPaper}>
                                {data ? <Bar data={data} options={options} /> : <p>No data to show...</p>}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

Stats.propTypes = {
    loading: PropTypes.bool,
    orders: PropTypes.array,
    getOrderItems: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        orders: state.order,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrderItems: (id) => dispatch({ type: GET_ORDERITEMS_REQUESTED, payload: id }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Stats);
