import './App.css';
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import AddNewMenu from './components/Admin/AddItem/AddNewMenu';
import ListMenu from './components/Admin/AddItem/ListMenu';
import Logout from './components/Admin/Authentication/Logout';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ValidationCheck from './components/Admin/Authentication/validationCheck';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/" element={<ValidationCheck />} />
          <Route path="/login" element={<ValidationCheck />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/additem" element={<AddNewMenu />} />
            <Route path="/viewmenu" element={<ListMenu />} />
            {/* <Route path="/manage" element={<ListMenu />} />
            <Route path="/feedbacks" element={<ListMenu />} /> */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer style={{fontSize:'1rem'}} />
    </div>
  );
}

export default App;
