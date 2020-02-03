import React, { useContext, useState } from 'react';

import '../styles/Profil.scss';

import { User } from '../context/UserContext';
import { storage, db } from '../config/fire';

export const Profil = () => {
    const { userProfil, userId } = useContext(User);

    const changeAvatar = (file) => {
        const fileName = file.name;
        const ref = storage.ref(`usersAvatars/${fileName}`);
        ref.put(file)
        .then(res => {
            return ref.getDownloadURL();
        })
        .then(url => {
            return db.doc(`users/${userId}`).update({
                avatar: url
            })
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="Profil">
            <div className="Profil_avatar_div">
                <img src={userProfil.avatar} alt="user avatar" />
                <input type="file" onChange={e => changeAvatar(e.target.files[0])} />
            </div>
        </div>
    )
}