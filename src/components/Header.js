import React, { useState, useEffect } from 'react';

import '../styles/Header.scss';

import { Back } from './Back';
import { NavList } from './NavList';

export const Header = ({ signOut }) => {
    const [isNavbarOpen, setNavbarstate] = useState(false);

    const toggleNavbar = () => {
        setNavbarstate(!isNavbarOpen)
    }

    const closeNavbar = () => {
        setNavbarstate(false);
    }

    return (
        <header className="Header">
            <nav className="navbar">
                <button className="toggle_nav_btn" onClick={toggleNavbar}>
                    <i className="fas fa-bars"></i>
                </button>
                <NavList navState={isNavbarOpen} />
                {isNavbarOpen?(<Back close={closeNavbar} />):(null)}
            </nav>
            <button className="logout_btn" onClick={signOut}>logout</button>
        </header>
    )
}