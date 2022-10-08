import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import {
  LOGGED_USER,
} from '../src/components/redux/menus/ActionTypes';
import * as toast from "./components/constants/ToastConstants";
import * as notify from "./components/constants/ToastCaller";

const cookies = new Cookies();

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const dispatch = useDispatch();

  const location = useLocation();
  const token = cookies.get("TOKEN");
  let session
  try{
    if(token){
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      session = JSON.parse(window.atob(base64));
      dispatch({ type: LOGGED_USER, payload: session })
      console.log("the session:",session,localStorage.getItem("user"));
    }
  }
  catch(e){
    console.log(e)
  }
  if(session){
    return session.exp > Date.now() / 1000
    ? <Outlet />
    : <Navigate to="/login" replace />
  }
  else{
    notify.notifyWarn(toast.LoginContinue);
    return <Navigate to="/login" replace />
  }
  
};

export default ProtectedRoutes;
