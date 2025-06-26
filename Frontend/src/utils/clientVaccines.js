import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const clientVaccines = axios.create({
    baseURL: 'http://localhost:3000',
});

// Adiciona o token automaticamente se existir
clientVaccines.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de resposta para lidar com erros
clientVaccines.interceptors.response.use(
    response => response,
    error => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default clientVaccines;
