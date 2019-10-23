import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import LoginForm from './LoginForm';
import LogOutForm from './LoginOutForm';
import WellcomeUser from './WellcomeUser';

const Header = ({ isAuthenticated, setIsAuthenticated, usuario, setUsuario }) => {

    const [ myToken, setMyToken ] =  useState('');

    return(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link to="/" className="navbar-brand">
                WellDone
            </Link>
            <ul className="navbar-nav mr-auto">
                { !isAuthenticated &&
                    <li className="nav-item">
                        <NavLink 
                            to='/usuario/nuevo'
                            className="nav-link"
                            activeClassName="active"
                        >Sign Up</NavLink>
                    </li>
                }
                { isAuthenticated &&
                <li className="nav-item">
                    <NavLink 
                        to='/usuario/articulos'
                        className="nav-link"
                        activeClassName="active"
                    >Mis Artículos</NavLink>
                </li>
                }
            </ul>
            { isAuthenticated &&
                    <WellcomeUser
                        usuario={ usuario }
                    />
                }
            { !isAuthenticated &&
                <LoginForm 
                    setIsAuthenticated={ setIsAuthenticated }
                    setMyToken={ setMyToken }
                    setUsuario={ setUsuario }
                />
            }
            {isAuthenticated &&
                <LogOutForm 
                    setIsAuthenticated={ setIsAuthenticated }
                    myToken={ myToken }
                    setUsuario={ setUsuario }
                />
            }
        </div>
    </nav>
)};

export default Header;