import { combineReducers } from "redux";
import menuDetails from "./menus/reducer/index";
import orderDetails from "./orders/reducer/index";
import categoryDetails from "./categories/reducer/index";
import setUserDetails from "./users/reducer/index"
import QRcodes from './qrcodes/reducer/index'

const rootReducer = combineReducers({
  menu: menuDetails,
  order: orderDetails,
  category: categoryDetails,
  user: setUserDetails,
  qr:QRcodes
});

export default rootReducer;
