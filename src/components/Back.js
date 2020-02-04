import React from 'react';

import '../styles/Back.scss';

export const Back = ({ close }) => {
    return(
        <div onClick={close} className="Back"></div>
    )
}