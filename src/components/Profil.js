import React, { useContext } from 'react';

import '../styles/Profil.scss';
import avatarUnknown from '../assets/unknown-avatar.jpg';

import { User } from '../context/UserContext';
import { storage, db } from '../config/fire';
import { ProfilForm } from './ProfilFom';

export const Profil = () => {
    const { userProfil, userId } = useContext(User);

    const changeAvatar = (file) => {
        if(file) {
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
        
    }

    return (
        <div className="Profil">
            <div className="Profil_avatar_div">
                <img src={userProfil.avatar || avatarUnknown} alt="user avatar" />
                <label 
                    htmlFor="input_avatar"
                    className="label_avatar">
                        choose avatar <i className="fas fa-cloud-download-alt"></i>
                </label>
                <input 
                    id="input_avatar"
                    accept="image/jpg, image/png, image/jpeg, image/svg" 
                    type="file" 
                    onChange={e => changeAvatar(e.target.files[0])} 
                />
            </div>

            <ProfilForm />
        </div>
    )
}