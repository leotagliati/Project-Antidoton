import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const AuthForm = ({
    username, password,
    setUsername, setPassword,
    errorMessage,
    onLogin, onRegister
}) => (
    <div
        className="card p-5 shadow rounded-4"
        style={{ minWidth: 350, maxWidth: 400, width: '100%' }}
    >
        <h3 className="text-center mb-4 text-primary fw-bold">Bem-vindo</h3>
        <p className="text-center text-muted mb-4" style={{ fontSize: '0.95rem' }}>
            Acesse sua conta ou cadastre-se para começar
        </p>

        <div className="field mb-4">
            <label className="form-label fw-semibold mb-1">Usuário</label>
            <InputText
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-100 p-inputtext-lg"
                placeholder="Digite seu usuário"
            />
        </div>

        <div className="field mb-4">
            <label className="form-label fw-semibold mb-1">Senha</label>
            <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
                required
                className="w-100 p-inputtext-lg"
                placeholder="Digite sua senha"
            />
        </div>

        {errorMessage && (
            <div className="alert alert-danger text-center py-2 small mb-4 rounded-3">
                {errorMessage}
            </div>
        )}

        <div className="d-flex flex-column gap-3">
            <Button
                label="Entrar"
                icon="pi pi-sign-in"
                className="p-button-lg p-button-primary"
                onClick={onLogin}
            />
            <Button
                label="Cadastrar"
                icon="pi pi-user-plus"
                className="p-button-lg p-button-outlined"
                onClick={onRegister}
            />
        </div>
    </div>
);

export default AuthForm;
