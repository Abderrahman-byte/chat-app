import React, { useContext } from 'react';

import { User } from '../context/UserContext';

export const Profil = () => {
    const { userProfil } = useContext(User);
    console.log(userProfil)
    return (
        <div className="Profil">
            this is profil
        </div>
    )
}