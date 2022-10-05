import React, { useEffect } from 'react';
import FirstPage from './FirstPage';
import MiniDrawer from '../Sidebar/Sidebar';
import './ShowMenu.css';
import { CssBaseline, Grid } from '@material-ui/core';

const GetMenu = () => {
	useEffect = () => {
		document.title = 'Order It - Add new item';
	};
	return (
		<div className="menu">
			<MiniDrawer headerTitle="Add Item" />
			<CssBaseline />
			<Grid xs={11}>
				<h1> Add New Menu Item</h1>
				<FirstPage />
			</Grid>
		</div>
	);
};

export default GetMenu;
