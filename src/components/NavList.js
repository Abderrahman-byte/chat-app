import React from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/NavList.scss';
import logo from '../assets/logo.png';

export const NavList = ({ navState , close }) => {
    
    return(
        <ul className={navState?"NavList show":"NavList"}>
            <li className="NavList_Header">
                <img src={logo} alt="logo of chat app" />
                <h1>Chat App</h1>
            </li>
            <li>
                <NavLink onClick={close} to="/profil">
                    <i className="fas fa-user"></i>
                    Profil
                </NavLink>
            </li>
            <li>
                <NavLink onClick={close} to="/rooms">
                    <i className="fas fa-comments"></i>
                    Chat Rooms
                </NavLink>
            </li>
            <li>
                <NavLink onClick={close} to="/create">
                    <i className="fas fa-plus"></i>
                    Create Chat Room
                </NavLink>
            </li>
        </ul>
    )
}