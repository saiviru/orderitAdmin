import './App.css';
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import ShowMenu from './components/Admin/AddItem/ShowMenu';
import ListMenu from './components/Admin/AddItem/ListMenu';
import Home from './components/Common/Home';
import Login from './components/Admin/Authentication/Login';
import Logout from './components/Admin/Authentication/Logout';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import ValidationCheck from './components/Admin/Authentication/validationCheck';

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
            <Route path="/additem" element={<ShowMenu />} />
            <Route path="/viewmenu" element={<ListMenu />} />
            {/* <Route path="/manage" element={<ListMenu />} />
            <Route path="/feedbacks" element={<ListMenu />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
