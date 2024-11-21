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
        <div style={styles.container}>
            <h1 style={styles.header}>CAPTCHA Solver with Coin Rewards</h1>
            <div style={styles.card}>
                <CoinBalance coins={coins} />
                <CaptchaSolver userId={userId} onUpdateCoins={updateCoins} />
            </div>
        </div>
    );
};

// Inline styles for the component
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', // Subtle gradient
    },
    header: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    card: {
        width: '350px',
        padding: '20px',
        border: '2px solid #ddd',
        borderRadius: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for depth
        textAlign: 'center',
    },
};

export default Home;
