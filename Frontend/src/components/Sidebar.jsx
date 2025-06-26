import { Button } from 'primereact/button';

const Sidebar = ({ username, activeSheet, onShowVaccinations, onShowAllVaccines, onLogout }) => {
    return (
        <div className="col-md-3 p-4 border min-vh-100 d-flex flex-column align-items-center gap-5">
            <div className="mb-4 d-flex flex-row align-items-center gap-2">
                <img src="https://placehold.co/50x50" alt="Logo" className="img-fluid" />
                <h5>nomeEmpresa</h5>
            </div>

            <img src="https://placehold.co/120x120" alt="Avatar" className="rounded-circle mb-3" />
            <h5 className="text-center">{username}</h5>

            <div className="d-flex flex-column flex-grow-1 mt-7 gap-2 w-100">
                <Button className={`p-button-secondary w-100 ${activeSheet === 'vaccinations' ? 'p-button-success' : ''}`} onClick={onShowVaccinations}>
                    Minhas Vacinações
                </Button>
                <Button className={`p-button-secondary w-100 ${activeSheet === 'allVaccines' ? 'p-button-success' : ''}`} onClick={onShowAllVaccines}>
                    Todas as Vacinas
                </Button>
            </div>

            <Button className="p-button-danger" onClick={onLogout}>Sair</Button>
        </div>
    );
};

export default Sidebar;
