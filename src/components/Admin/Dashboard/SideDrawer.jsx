import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Drawer, Divider, List } from '@material-ui/core/';
import { ChevronLeft } from '@material-ui/icons';
import { handleDrawerClose } from './Dashboard';
import { MainListItems, secondaryListItems } from './listItems';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const SideDrawer = (props) => {
	const classes = useStyles();
	return (
		<Drawer
			variant="permanent"
			classes={{
				paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
			}}
			open={props.open}
		>
			<div className={classes.toolbarIcon}>
				<IconButton onClick={handleDrawerClose}>
					<ChevronLeft />
				</IconButton>
			</div>
			<Divider />
			<List>
				<MainListItems />
			</List>
			<Divider />
			<List>{secondaryListItems}</List>
		</Drawer>
	);
};

export default SideDrawer;
