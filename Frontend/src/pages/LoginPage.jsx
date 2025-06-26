import React, { useState } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { login, register } = useAuth(setErrorMessage);

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            style={{
                background: '#f0f4f8',
                padding: '1rem',
            }}
        >
            <div
                style={{
                    background: '#ffffff',
                    borderRadius: '1rem',
                    padding: '2rem',
                    width: '100%',
                    height: '100%',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="text-center mb-4">
                    <h2 style={{ fontWeight: '600', color: '#2c3e50' }}>Antidoton</h2>
                    <p style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                        Acesso ao sistema de vacinação
                    </p>
                </div>
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <AuthForm
                        username={username}
                        password={password}
                        setUsername={setUsername}
                        setPassword={setPassword}
                        errorMessage={errorMessage}
                        onLogin={() => login(username, password)}
                        onRegister={() => register(username, password)}
                    />
                </div>

                <p
                    className="text-center mt-4"
                    style={{ fontSize: '0.8rem', color: '#adb5bd' }}
                >
                    © 2025 Antidoton. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
