import axios from 'axios';

const API_URL = 'http://localhost:5173/api/ruta'; // Asegúrate de que esta URL sea la correcta

export const getRutas = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching rutas:', error);
        throw error;
    }
};

export const addRuta = async (ruta) => {
    try {
        const response = await axios.post(API_URL, ruta);
        return response.data;
    } catch (error) {
        console.error('Error adding ruta:', error);
        throw error;
    }
};

// Agregar funciones para update y delete rutas si es necesario
