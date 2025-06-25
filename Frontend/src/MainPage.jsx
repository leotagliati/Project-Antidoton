import React from 'react';
import VaccineCard from './VaccineCard';
import { Button } from 'primereact/button';

export const MainPage = () => {
    const mockCompanyName = 'nomeEmpresa'; // Mock company name for testing
    const mockName = 'defaultUser'; // Mock username for testing

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 p-4 border min-vh-100 d-flex flex-column align-items-center gap-5">
                    {/* Logo */}
                    <div className="mb-4 d-flex flex-row align-items-center gap-2 row-">
                        <img
                            src="https://placehold.co/50x50"
                            alt="Logo"
                            className="img-fluid"
                        />  
                        <h5>{mockCompanyName}</h5>
                    </div>
                    <div>
                        {/* Avatar */}
                        <img
                            src="https://placehold.co/120x120"
                            alt="User Avatar"
                            className="rounded-circle mb-3"
                        />

                        {/* Nome */}
                        <h5 className="text-center">{mockName}</h5>

                    </div>

                    <div className="d-flex flex-column flex-grow-1 mt-7 gap-2 w-100">
                        {/* Botão Dashboard */}
                        <Button className="p-button-secondary w-100" onClick={() => console.log('Dashboard clicked')}>
                            Vacinas
                        </Button>
                        {/* Botão Agendamentos */}
                        <Button className="p-button-secondary w-100" onClick={() => console.log('Agendamento clicked')}>
                            Agendamento
                        </Button>
                        {/* Botão Historico */}
                        <Button className="p-button-secondary w-100" onClick={() => console.log('Agendamento clicked')}>
                            Historico
                        </Button>
                    </div>
                    <div className=''>
                        {/* Botão Sair */}
                        <Button className="p-button-danger " onClick={() => console.log('Sair clicked')}>
                            Sair
                        </Button>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="col-md-9 p-4">
                    <VaccineCard name={mockName} />
                </div>
            </div>
        </div>
    );
};
export default MainPage;