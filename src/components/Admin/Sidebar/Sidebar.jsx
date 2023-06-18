import * as React from 'react';
import {connect} from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { List, Link, Icon } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, makeStyles, Button, Menu, MenuItem, Fade } from '@material-ui/core';
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";


const drawerWidth = 240;

const SidebarItems = [
	{
		icon: 'dashboard',
		text: 'Dashboard',
		link: '/dashboard',
	},
	{
		icon: 'menu_book',
		text: 'View Menu',
		link: '/viewMenu',
	},
	{
		icon: 'restaurant_menu',
		text: 'Add Item',
		link: '/addItem',
	},
	{
		icon: 'receipt',
		text: 'Orders',
		link: '/orders',
	},
	{
		icon: 'qr_code',
		text: 'QR code',
		link: '/qrgenerate',
	},
	// {
	// 	icon: 'group',
	// 	text: 'Manage People',
	// 	link: '/manage',
	// },
	// {
	// 	icon: 'feedback',
	// 	text: 'Feedbacks',
	// 	link: '/feedbacks',
	// },
];

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const useStyles = makeStyles(() => ({
	root: {},
	avatar: {
		height: 50,
		width: 50,
	},
}));

function MiniDrawer(props ) {
	console.log("the props",props,props.headerTitle)
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const oopen = Boolean(anchorEl);
	const classes = useStyles();

	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 3,
							...(open && { display: 'none' }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h5" noWrap component="div">
						OrderIt
					</Typography>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{
							margin: '0 auto',
						}}
					>
						{props.headerTitle}
					</Typography>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row-reverse',
						}}
					>
						<Button
							aria-controls="fade-menu"
							aria-haspopup="true"
							onClick={handleClick}
							startIcon={<ArrowDropDownIcon />}
						>
							{props.user.username}
							<Avatar
								className={classes.avatar}
								src={'https://miro.medium.com/fit/c/88/88/1*nOsEVo6PhYaJRK1i_9Ndqg.jpeg'}
								style={{
									marginLeft: '10px',
								}}
							/>
						</Button>
					</div>

					<Menu
						id="fade-menu"
						anchorEl={anchorEl}
						keepMounted
						open={oopen}
						onClose={handleClose}
						TransitionComponent={Fade}
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<Link href='/logout' color="inherit" sx={{ textDecoration: 'none' }}><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
						
					</Menu>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List color="inherit">
					{SidebarItems.map((text, index) => (
						<Link href={text.link} color="inherit" sx={{ textDecoration: 'none' }}>
							<ListItem key={text.text} disablePadding sx={{ display: 'block' }}>
								<ListItemButton
									sx={{
										minHeight: 48,
										justifyContent: open ? 'initial' : 'center',
										px: 2.5,
									}}
								>
									<Icon sx={{ margin: 1 }}>{text.icon}</Icon>
									<ListItemText primary={text.text} sx={{ opacity: open ? 1 : 0 }} />
								</ListItemButton>
							</ListItem>
						</Link>
					))}
				</List>
				<Divider />
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
			</Box>
		</Box>
	);
}

const mapStateToProps = state => {
	return {
	  user: state.menu.user
	};
  };
  export default connect(mapStateToProps)(MiniDrawer);