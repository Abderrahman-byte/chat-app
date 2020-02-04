import React from 'react';

import '../styles/NavList.scss';
import logo from '../assets/logo.png';

export const NavList = ({ navState}) => {
    
    return(
        <ul className={navState?"NavList show":"NavList"}>
            <li className="NavList_Header">
                <img src={logo} alt="logo of chat app" />
                <h1>Chat App</h1>
            </li>
            <li>
                <a href="/">profil</a>
            </li>
            <li>
                <a href="/">profil</a>
            </li>
            <li>
                <a href="/">profil</a>
            </li>
        </ul>
    )
}