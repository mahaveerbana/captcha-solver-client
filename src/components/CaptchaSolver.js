import React, { useState, useEffect } from 'react';
import { fetchCaptcha, validateCaptcha } from '../api/captchaApi';

const CaptchaSolver = ({ userId, onUpdateCoins }) => {
    const [captcha, setCaptcha] = useState('');
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch CAPTCHA on load or refresh
    const getCaptcha = async () => {
        try {
            setLoading(true);
            const data = await fetchCaptcha(userId);
            setCaptcha(data.captcha);
            setMessage('');
            setMessageType('');
            setAnswer('');
            onUpdateCoins(data.coins);
        } catch (error) {
            setMessage('Failed to load CAPTCHA. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    // Validate CAPTCHA
    const submitAnswer = async () => {
        try {
            setLoading(true);
            const data = await validateCaptcha(userId, answer);
            setMessage(data.message);
            setMessageType(data.message === 'Correct!' ? 'success' : 'error');
            onUpdateCoins(data.coins);

            if (data.message === 'Correct!') {
                setTimeout(getCaptcha, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'Validation failed.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCaptcha();
    }, []);

    return (
        <div style={styles.container}>
            {loading ? (
                <div style={styles.loading}>Loading...</div>
            ) : (
                <>
                    <div style={styles.captchaCard}>
                        <div dangerouslySetInnerHTML={{ __html: captcha }} style={styles.captchaImage} />
                        <button
                            onClick={getCaptcha}
                            style={styles.refreshButton}
                            title="Refresh CAPTCHA"
                        >
                            🔄
                        </button>
                    </div>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter CAPTCHA"
                        style={styles.input}
                    />
                    {message && (
                        <p
                            style={
                                messageType === 'success'
                                    ? styles.successMessage
                                    : styles.errorMessage
                            }
                        >
                            {message}
                        </p>
                    )}
                    <button
                        onClick={submitAnswer}
                        style={!answer || loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
                        disabled={!answer || loading}
                    >
                        Submit
                    </button>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffffff',
        maxWidth: '350px',
        margin: '0 auto',
    },
    captchaCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
    },
    captchaImage: {
        flex: 1,
        marginRight: '10px',
        border: '2px solid #e5e7eb',
        padding: '10px',
        borderRadius: '5px',
    },
    input: {
        width: '100%',
        padding: '10px',
        fontSize: '1rem',
        marginBottom: '10px',
        border: '1px solid #d1d5db',
        borderRadius: '5px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    button: {
        backgroundColor: '#000080',
        color: '#fff',
        padding: '10px 50px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, opacity 0.3s',
    },
    buttonDisabled: {
        backgroundColor: '#a1a1aa',
        color: '#f9fafb',
        cursor: 'not-allowed',
        opacity: 0.7,
    },
    refreshButton: {
        backgroundColor: '#4caf50',
        color: '#fff',
        padding: '5px 10px',
        fontSize: '0.9rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    successMessage: {
        marginTop: '10px',
        fontSize: '1rem',
        color: 'green',
    },
    errorMessage: {
        marginTop: '10px',
        fontSize: '1rem',
        color: 'red',
    },
    loading: {
        fontSize: '1.2rem',
        color: '#555',
    },
};

export default CaptchaSolver;
