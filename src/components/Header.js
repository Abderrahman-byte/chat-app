import React, { useState, useEffect } from 'react';

import '../styles/Header.scss';

export const Header = ({ signOut }) => {

    return (
        <header className="Header">
            <button onClick={signOut}>logout</button>
        </header>
    )
}