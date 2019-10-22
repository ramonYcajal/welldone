import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link to="/" className="navbar-brand">
                WellDone
            </Link>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink 
                        to='/usuario/nuevo'
                        className="nav-link"
                        activeClassName="active"
                    >Sign Up</NavLink>
                </li>
                {/* <li className="nav-item">
                    <NavLink 
                        to='/categorias'
                        className="nav-link"
                        activeClassName="active"
                    >Categorías</NavLink>
                </li> */}
            </ul>
        </div>
    </nav>
);

export default Header;