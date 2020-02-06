import React, { useContext } from 'react';

import '../styles/Profil.scss';
import avatarUnknown from '../assets/unknown-avatar.jpg';

import { User } from '../context/UserContext';
import { storage, db } from '../config/fire';
import { ProfilForm } from './ProfilFom';
import { auth } from '../config/fire';
import { useHistory } from 'react-router-dom';

export const Profil = () => {
    const { userProfil, userId } = useContext(User);

    const history = useHistory();

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

    const deleteAccount = () => {
        auth.signInWithEmailAndPassword(userProfil.email, userProfil.password)
        .then(cred => {
            const roomIds = [];
            history.push('/login');
            db.collection('rooms').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if(doc.data().admin_id === userId) roomIds.push(doc.id);
                })
            })
            .then(() => {
                roomIds.forEach(id => {
                    db.doc(`rooms/${id}`).delete();
                })
            })

            db.doc(`users/${userId}`).delete()
            cred.user.delete();
        })
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

            <div className="delete_account_div">
                <button onClick={deleteAccount}>delete account</button>
            </div>
        </div>
    )
}