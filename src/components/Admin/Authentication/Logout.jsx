import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie";
import { useDispatch } from 'react-redux';
import {
    LOGGED_USER,
  } from '../../redux/menus/ActionTypes';
const cookies = new Cookies();



const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
            cookies.remove('TOKEN');
            localStorage.removeItem("user");
            dispatch({type: LOGGED_USER, payload: {} })
          navigate("/login", { replace: true });
  
    }, []);
  
    return '';
  };

  export default Logout;