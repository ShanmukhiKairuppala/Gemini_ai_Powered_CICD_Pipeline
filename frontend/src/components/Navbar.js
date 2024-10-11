import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        navigate('/login'); // Redirect to login page
    };

    const isLoggedIn = localStorage.getItem('token');
    return (
        <nav>
            <h1>Recipe Share</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                {!isLoggedIn && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li><Link to="/add-recipe">Add Recipe</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
            </ul>
            {/* <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/add-recipe">Add Recipe</Link></li>
            </ul> */}
        </nav>
    );
};

export default Navbar;
