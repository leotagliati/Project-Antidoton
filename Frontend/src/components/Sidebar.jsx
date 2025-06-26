import { Button } from 'primereact/button';

const Sidebar = ({ username, activeSheet, onShowVaccinations, onShowAllVaccines, onLogout }) => {
    return (
        <div
            className="col-md-3 p-4 min-vh-100 d-flex flex-column align-items-center gap-5"
            style={{
                width: '300px',
                backgroundColor: '#f0f4f8',
                borderRight: '1px solid #ddd',
                borderTopRightRadius: '1rem',
                borderBottomRightRadius: '1rem',
            }}
        >
            <div className="mb-4 d-flex flex-row align-items-center gap-2">
                <img src="/company-icon.png" alt="Logo" className="img-fluid rounded-circle border border-secondary"
                    style={{width: '50px'}} />
                <h5 style={{ color: '#34495e', fontWeight: '600' }}>Antidoton</h5>
            </div>
            <div>

                <img
                    src="user-icon.png"
                    alt="Avatar"
                    className="border border-secondary border-4 rounded-circle mb-3"
                    style={{
                        width: '130px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                    }}
                />
                <h5 className="text-center" style={{ color: '#2c3e50', fontWeight: '500' }}>
                    {username}
                </h5>
            </div>

            <div className="d-flex flex-column flex-grow-1 mt-7 gap-3 w-100">
                <Button
                    icon="pi pi-wave-pulse"
                    iconPos="left"
                    className={`w-100m p-button-secondary ${activeSheet === 'vaccinations' ? 'p-button-success' : ''}`}
                    style={{ fontWeight: activeSheet === 'vaccinations' ? '600' : '400' }}
                    onClick={onShowVaccinations}
                >
                    Minhas Vacinações
                </Button>
                <Button
                    icon="pi pi-list"
                    iconPos="left"
                    className={`w-100 p-button-secondary ${activeSheet === 'allVaccines' ? 'p-button-success' : ''}`}
                    style={{ fontWeight: activeSheet === 'allVaccines' ? '600' : '400' }}
                    onClick={onShowAllVaccines}
                >
                    Todas as Vacinas
                </Button>
            </div>

            <Button
                icon="pi pi-sign-out"
                iconPos="left"
                className="p-button-danger w-100"
                style={{ fontWeight: '600' }}
                onClick={onLogout}
            >
                Sair
            </Button>
        </div>
    );
};

export default Sidebar;
