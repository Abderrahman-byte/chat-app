import React, { useState, useEffect } from 'react';

import '../styles/Header.scss';

export const Header = () => {
    const [backPath, setBackPath] = useState(null);

    useEffect(() => {
        const today = new Date();
        let hour = today.getHours();

        if(hour >= 7 && hour < 12) {
            // morning
            import('../assets/morning_bg.jpg').then(image => {
                setBackPath(image.default);
            });
        } else if(hour >= 12 && hour < 18) {
            // afternoon
            import('../assets/afternoon_bg.jpg').then(image => {
                setBackPath(image.default);
            });
        } else if(hour >= 18 && hour < 20) {
            // evening
            import('../assets/evening_bg.jpg').then(image => {
                setBackPath(image.default);
            });
        } else {
            // night
            import('../assets/night_bg.jpg').then(image => {
                setBackPath(image.default);
            });
        }

    }, []);

    return (
        <header style={{ backgroundImage: `url(${backPath})`}} className="Header">
            <div className="Header_container"></div>
        </header>
    )
}