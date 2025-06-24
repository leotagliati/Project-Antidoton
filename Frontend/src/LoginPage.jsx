import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Usuário:', username);
        console.log('Senha:', password);
        
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="field mb-3">
                        <label htmlFor="username" className="form-label">Usuário</label>
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

                    <Button label="Entrar" icon="pi pi-sign-in" className="w-100 p-button-primary" onClick={handleSubmit} />
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
