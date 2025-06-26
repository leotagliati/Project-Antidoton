import { useNavigate } from 'react-router-dom';
import clientAuth from '../utils/clientAuth';

const useAuth = (setErrorMessage) => {
    const navigate = useNavigate();

    const handleResponse = (response) => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', user.username);
        localStorage.setItem('isAdmin', user.isAdmin ? 'true' : 'false');

        if (user.isAdmin) {
            navigate('/admin', { replace: true });
        } else {
            navigate('/dashboard', { replace: true });
        }
    };

    const login = (username, password) => {
        setErrorMessage('');
        if (!username || !password) return setErrorMessage('Usuário e senha são obrigatórios');

        clientAuth.post('/auth/login', { username, password })
            .then(handleResponse)
            .catch(err => {
                if (err.response?.status === 401) {
                    setErrorMessage('Usuário ou senha inválidos');
                } else {
                    setErrorMessage('Erro ao fazer login, tente novamente mais tarde');
                }
            });
    };

    const register = (username, password) => {
        setErrorMessage('');
        if (!username || !password) return setErrorMessage('Usuário e senha são obrigatórios');

        clientAuth.post('/auth/register', { username, password })
            .then(handleResponse)
            .catch(err => {
                if (err.response?.status === 400) {
                    setErrorMessage('Usuário já existe');
                } else {
                    setErrorMessage('Erro ao fazer cadastro, tente novamente mais tarde');
                }
            });
    };

    return { login, register };
};

export default useAuth;
