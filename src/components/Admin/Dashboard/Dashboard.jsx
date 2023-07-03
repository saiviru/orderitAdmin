import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Chart from './Chart';
import MyChart from './NewChart';
import Deposits from './Deposits';
import Orders from './Orders';
import Copyright from '../../Common/Copyright';
import MiniDrawer from '../Sidebar/Sidebar'

import axios from 'axios';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import {
  GET_ORDERITEMS_REQUESTED,
} from "../../redux/orders/ActionTypes";
import { viewMenu } from '../../redux/Actions/ActionCreators';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));


function Dashboard({ orders: { loading, order }, getOrderItems }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [orderDetails, setorderDetails] = useState();
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MiniDrawer headerTitle="Dashboard" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <MyChart orderss={orderDetails}/>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits orderss={orderDetails} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders orderss={orderDetails}/>
              </Paper>
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

const mapStateToProps = state => {
  return {
    menu: state.menu,
    orders: state.order,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewMenu: (menu) => dispatch(viewMenu(menu)),
    getOrderItems: (id) => dispatch({ type: GET_ORDERITEMS_REQUESTED, payload: id }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);