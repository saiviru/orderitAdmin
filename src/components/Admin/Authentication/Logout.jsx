import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import {
    LOGGED_USER,
  } from '../../redux/menus/ActionTypes';
  import 'react-toastify/dist/ReactToastify.css';
import * as toast from '../../constants/ToastConstants'
import * as notify from '../../constants/ToastCaller';

const cookies = new Cookies();



const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
            cookies.remove('TOKEN');
            localStorage.removeItem("user");
            dispatch({type: LOGGED_USER, payload: {} })
            navigate("/login", { replace: true });
            notify.notifyInfo(toast.loginFailed);
    }, []);
  
    return '';
  };

  export default Logout;