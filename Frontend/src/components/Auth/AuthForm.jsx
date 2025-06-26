import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const AuthForm = ({
    username, password,
    setUsername, setPassword,
    errorMessage,
    onLogin, onRegister
}) => (
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
            <label className="form-label">Senha</label>
            <Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                toggleMask
                feedback={false}
                required
                className="w-100"
                placeholder="Digite sua senha"
            />
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <div className="d-flex flex-row gap-2">
            <Button label="Entrar" icon="pi pi-sign-in" className="w-100 p-button-primary" onClick={onLogin} />
            <Button label="Cadastrar" icon="pi pi-sign-up" className="w-100 p-button-secondary" onClick={onRegister} />
        </div>
    </div>
);

export default AuthForm;
