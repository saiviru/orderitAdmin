import React from 'react';
import {Link} from 'react-router-dom';

const Home =({})=>{
    return(
        <nav>
            <Link to="/login">Login</Link><br />
            <Link to="/additem">Add Item</Link>
        </nav>
    )
}

export default Home;
