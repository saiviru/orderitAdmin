import { combineReducers } from 'redux';
import menuDetails from './menus/reducer/index';
import orderDetails from './orders/reducer/index';


const rootReducer = combineReducers({
    menu: menuDetails,
    order: orderDetails
});

export default rootReducer;
