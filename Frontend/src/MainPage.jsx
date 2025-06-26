import React, { useEffect, useState } from 'react';
import VaccineCardSheet from './components/VaccineCardSheet';
import VaccinesSheet from './components/VaccinesSheet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import clientVaccines from './utils/clientVaccines';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
    const mockCompanyName = 'nomeEmpresa';
    const username = localStorage.getItem('username') || 'defaultUser';

    const [searchTerm, setSearchTerm] = useState('');
    const [vaccinations, setVaccinations] = useState([]);
    const [allVaccines, setAllVaccines] = useState([]);
    const [activeSheet, setActiveSheet] = useState('vaccinations');
    const navigate = useNavigate();

    const fetchVaccinationsByTerm = async () => {
        if (searchTerm.trim() !== '') {
            try {
                const response = await clientVaccines.get('/vaccinations/search', {
                    params: { username, vaccineName: searchTerm }
                });
                setVaccinations(response.data);
            } catch (error) {
                console.error('Erro ao buscar vacinações:', error);
                setVaccinations([]);
            }
        } else {
            try {
                const response = await clientVaccines.get('/vaccinations', {
                    params: { username }
                });
                setVaccinations(response.data);
            } catch (error) {
                console.error('Erro ao buscar vacinações:', error);
                setVaccinations([]);
            }
        }
    };

    const fetchAllVaccines = async () => {
        try {
            const response = await clientVaccines.get('/vaccines');
            setAllVaccines(response.data);
        } catch (error) {
            console.error('Erro ao buscar vacinas:', error);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (activeSheet === 'vaccinations') {
                fetchVaccinationsByTerm();
            }
        }, 500);
        return () => clearTimeout(debounce);
    }, [searchTerm, username, activeSheet]);

    const handleShowVaccinations = () => {
        setActiveSheet('vaccinations');
        fetchVaccinationsByTerm();
    };

    const handleShowAllVaccines = () => {
        setActiveSheet('allVaccines');
        fetchAllVaccines();
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleAdd = async () => {
        const novaVacina = {
            name: '',
            dose: '',
            date: new Date()
        };

        try {
            const response = await clientVaccines.post('/vaccinations/add', {
                username,
                vaccine: {
                    name: novaVacina.name,
                    dose: novaVacina.dose,
                    date: novaVacina.date.toISOString().split('T')[0]
                }
            });

            setVaccinations(prev => [...prev, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar vacina:', error);
        }
    };

    const handleEdit = async (novaVacina) => {
        try {
            await clientVaccines.put(`/vaccinations/update/${novaVacina.id}`, {
                username,
                vaccineId: novaVacina.id,
                vaccine: {
                    name: novaVacina.name,
                    dose: novaVacina.dose,
                    date: new Date(novaVacina.date).toISOString().split('T')[0]
                }
            });

            setVaccinations(prev =>
                prev.map(v => (v.id === novaVacina.id ? novaVacina : v))
            );
        } catch (error) {
            console.error('Erro ao editar vacina:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await clientVaccines.delete(`/vaccinations/delete/${id}`, {
                data: { username, vaccineId: id }
            });
            setVaccinations(prev => prev.filter(v => v.id !== id));
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
                    <h5 className="text-center">{username}</h5>

                    <div className="d-flex flex-column flex-grow-1 mt-7 gap-2 w-100">
                        <Button
                            className={`p-button-secondary w-100 ${activeSheet === 'vaccinations' ? 'p-button-success' : ''}`}
                            onClick={handleShowVaccinations}
                        >
                            Minhas Vacinações
                        </Button>
                        <Button
                            className={`p-button-secondary w-100 ${activeSheet === 'allVaccines' ? 'p-button-success' : ''}`}
                            onClick={handleShowAllVaccines}
                        >
                            Todas as Vacinas
                        </Button>
                    </div>

                    <Button className="p-button-danger" onClick={handleLogout}>Sair</Button>
                </div>

                {/* Conteúdo */}
                <div className="col-md-9 p-4">

                    {activeSheet === 'vaccinations' && (
                        <>
                            <h2 className="mb-4">Minhas Vacinações</h2>
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

                            <VaccineCardSheet
                                vaccines={vaccinations}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onAdd={handleAdd}
                            />
                        </>
                    )}

                    {activeSheet === 'allVaccines' && (
                        <>
                            <h2 className="mb-4">Todas as Vacinas</h2>
                            <VaccinesSheet vaccines={allVaccines} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
