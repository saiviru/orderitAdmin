import { combineReducers } from 'redux';
import menuDetails from './menus/reducer/index';

const rootReducer = combineReducers({
    menu: menuDetails,
});

export default rootReducer;
