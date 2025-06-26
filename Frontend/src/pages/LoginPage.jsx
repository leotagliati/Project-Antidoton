import React, { useState } from 'react';
import AuthForm from '../components/Auth/AuthForm';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { login, register } = useAuth(setErrorMessage);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
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
    );
};

export default LoginPage;
