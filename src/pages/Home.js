import React, { useState } from 'react';
import CaptchaSolver from '../components/CaptchaSolver';
import CoinBalance from '../components/CoinBalance';

const Home = () => {
    const [coins, setCoins] = useState(0);
    const userId = 'default'; 

    const updateCoins = (newCoins) => {
        setCoins(newCoins);
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <CoinBalance coins={coins} />
            <CaptchaSolver userId={userId} onUpdateCoins={updateCoins} />
        </div>
    );
};

export default Home;
