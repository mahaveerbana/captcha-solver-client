import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/captcha';

// Fetch a new CAPTCHA
export const fetchCaptcha = async (userId) => {
    const response = await axios.get(API_BASE_URL, {
        params: { userId },
    });
    return response.data;
};

// Validate the CAPTCHA
export const validateCaptcha = async (userId, answer) => {
    const response = await axios.post(`${API_BASE_URL}/validate`, { userId, answer });
    return response.data;
};
