import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import clientAuth from './utils/clientAuth';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        clientAuth.post('/auth/signin', { username, password })
            .then(response => {
                console.log('Login bem-sucedido:', response.data);
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
            });
    };
    const handleSignUp = (e) => {
        e.preventDefault();
        clientAuth.post('/auth/signup', { username, password })
            .then(response => {
                console.log('Cadastro bem-sucedido:', response.data);
            })
            .catch(error => {
                console.error('Erro ao fazer cadastro:', error);
            });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Login</h3>
                <div className="field mb-3">
                    <label className="form-label">Usuário</label>
                    <InputText
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-100"
                        placeholder="Digite seu usuário"
                    />
                </div>

                <div className="field mb-4">
                    <label htmlFor="password" className="form-label">Senha</label>
                    <Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        toggleMask
                        feedback={false}
                        required
                        placeholder="Digite sua senha"
                        className="w-100"
                    />
                </div>
                <div className='d-flex flex-row gap-2'>
                    <Button label="Entrar" icon="pi pi-sign-in" className="w-100 p-button-primary" onClick={handleSignIn} />
                    <Button label="Cadastrar" icon="pi pi-sign-up" className="w-100 p-button-primary" onClick={handleSignUp} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
