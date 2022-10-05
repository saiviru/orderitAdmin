import React, { useEffect } from 'react';
import './ListMenu.css';
import MiniDrawer from '../Sidebar/Sidebar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GET_MENUITEMS_REQUESTED, DELETE_MENU_REQUESTED } from '../../redux/menus/ActionTypes';
import { Grid } from '@material-ui/core';


const ListMenu = ({ menu: { loading, menu }, getMenuList, deleteMenu }) => {
	useEffect(() => {
		getMenuList();
		document.title = 'Order It - View Menu';
		// eslint-disable-next-line
	}, []);
	return (
		<React.Fragment>
			<MiniDrawer headerTitle="View Menu Items" />
			{loading && 'Loading...'}
			<ul className="mainList">
				{console.log('the store from listmenu', menu)}
				{menu && menu.length > 0 ? (
					menu.map((item, id) => {
						return (
							<Grid xs={9} md={8} >
								<li className="listItem" key={item._id} onClick={() => deleteMenu(item._id)}>
									<b>{id + 1}.</b>
									<br />
									<label>Item Name : {item.itemName}</label>
									<br />
									<label>Item Price : {item.price}</label>
									<br />
									<label>Item Description : {item.description}</label>
									<br />
									<label>Image:</label>
									<br />
									<img
										src={'https://foodappdata.s3.ap-south-1.amazonaws.com/josh/' + item.image}
										alt={'the menu picture for' + item.itemName}
									/>
								</li>
							</Grid>
						);
					})
				) : (
					<li>No Menu Item(s) left</li>
				)}
			</ul>
		</React.Fragment>
	);
};

ListMenu.propTypes = {
	loading: PropTypes.bool,
	menu: PropTypes.array,
	getMenuList: PropTypes.func.isRequired,
	deleteMenu: PropTypes.func.isRequired,
};

// Get state to props
const mapStateToProps = (state) => ({
	menu: state.menu,
});

// Get dispatch / function to props
const mapDispatchToProps = (dispatch) => ({
	getMenuList: () => dispatch({ type: GET_MENUITEMS_REQUESTED }),
	deleteMenu: (id) => dispatch({ type: DELETE_MENU_REQUESTED, payload: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListMenu);
