import React, { useState, useEffect } from 'react';
import { fetchCaptcha, validateCaptcha } from '../api/captchaApi';

const CaptchaSolver = ({ userId, onUpdateCoins }) => {
    const [captcha, setCaptcha] = useState('');
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');

    // Fetch CAPTCHA on load or reset
    const getCaptcha = async () => {
        try {
            const data = await fetchCaptcha(userId);
            setCaptcha(data.captcha);
            setMessage('');
            setAnswer('');
            onUpdateCoins(data.coins)
        } catch (error) {
            console.error('Error fetching CAPTCHA:', error);
        }
    };

    // Validate CAPTCHA
    const submitAnswer = async () => {
        try {
            const data = await validateCaptcha(userId, answer);
            setMessage(data.message);
            onUpdateCoins(data.coins);
            getCaptcha();
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    useEffect(() => {
        getCaptcha();
    }, []);

    return (
        <div>
            <div dangerouslySetInnerHTML={{ __html: captcha }} />
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter CAPTCHA"
                style={{ margin: '10px 0' }}
            />
            <br />
            <button onClick={submitAnswer}>Submit</button>
            <p>{message}</p>
        </div>
    );
};

export default CaptchaSolver;
