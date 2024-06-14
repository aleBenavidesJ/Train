import axios from 'axios';

const API_URL = 'http://localhost:5173/api/tiquete';

export const comprarTiquete = async (tiquete) => {
    try {
        const response = await axios.post(API_URL, tiquete);
        return response.data;
    } catch (error) {
        console.error('Error buying tiquete:', error);
        throw error;
    }
};

export const getTiquetes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching tiquetes:', error);
        throw error;
    }
};
