import React, { useEffect, useState } from 'react';
import VaccineCard from './components/VaccineCard';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import clientVaccines from './utils/clientVaccines';

export const MainPage = () => {
    const mockCompanyName = 'nomeEmpresa';
    const mockName = 'defaultUser';

    const [searchTerm, setSearchTerm] = useState('');
    const [vacinas, setVacinas] = useState([]);

    useEffect(() => {
        const fetchVacinasPorTermo = async () => {
            if (searchTerm.trim() !== '') {
                try {
                    const response = await clientVaccines.get('/vaccines/search', {
                        params: { username: mockName, vaccineName: searchTerm }
                    });
                    setVacinas(response.data);
                } catch (error) {
                    console.error('Erro ao buscar vacinas:', error);
                    setVacinas([]);
                }
            } else {
                try {
                    const response = await clientVaccines.get('/vaccines', {
                        params: { username: mockName }
                    });
                    setVacinas(response.data);
                } catch (error) {
                    console.error('Erro ao buscar vacinas:', error);
                    setVacinas([]);
                }
            }
        };

        const debounce = setTimeout(fetchVacinasPorTermo, 500);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    const handleAdd = async () => {
        const novaVacina = {
            name: '',
            dose: '',
            date: new Date()
        };

        try {
            const response = await clientVaccines.post('/vaccines/add', {
                username: mockName,
                vaccine: {
                    name: novaVacina.name,
                    dose: novaVacina.dose,
                    date: novaVacina.date.toISOString().split('T')[0]
                }
            });

            setVacinas(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar vacina:', error);
        }
    };

    const handleEdit = async (novaVacina) => {
        try {
            await clientVaccines.put(`/vaccines/update/${novaVacina.id}`, {
                username: mockName,
                vaccineId: novaVacina.id,
                vaccine: {
                    name: novaVacina.name,
                    dose: novaVacina.dose,
                    date: new Date(novaVacina.date).toISOString().split('T')[0]
                }
            });

            setVacinas(prev =>
                prev.map(v => (v.id === novaVacina.id ? novaVacina : v))
            );
        } catch (error) {
            console.error('Erro ao editar vacina:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await clientVaccines.delete(`/vaccines/delete/${id}`, {
                data: { username: mockName, vaccineId: id }
            });
            setVacinas(prev => prev.filter(v => v.id !== id));
        } catch (error) {
            console.error('Erro ao deletar vacina:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 p-4 border min-vh-100 d-flex flex-column align-items-center gap-5">
                    <div className="mb-4 d-flex flex-row align-items-center gap-2">
                        <img src="https://placehold.co/50x50" alt="Logo" className="img-fluid" />
                        <h5>{mockCompanyName}</h5>
                    </div>

                    <img src="https://placehold.co/120x120" alt="Avatar" className="rounded-circle mb-3" />
                    <h5 className="text-center">{mockName}</h5>

                    <div className="d-flex flex-column flex-grow-1 mt-7 gap-2 w-100">
                        <Button className="p-button-secondary w-100">Vacinas</Button>
                        <Button className="p-button-secondary w-100">Agendamento</Button>
                        <Button className="p-button-secondary w-100">Histórico</Button>
                    </div>

                    <Button className="p-button-danger" onClick={() => console.log('Sair clicked')}>Sair</Button>
                </div>

                {/* Conteúdo */}
                <div className="col-md-9 p-4">
                    <h2 className="mb-4">Dashboard</h2>

                    <div className="d-flex justify-content-start mb-4">
                        <div className="p-input-icon-left" style={{ width: '100%', maxWidth: '600px' }}>
                            <i className="pi pi-search px-2" />
                            <InputText
                                placeholder="Buscar vacina"
                                className="px-5 w-100"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <VaccineCard vacinas={vacinas} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
