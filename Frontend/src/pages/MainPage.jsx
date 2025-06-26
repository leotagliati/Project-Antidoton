import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import VaccineCardSheet from '../components/VaccineCardSheet';
import VaccinesSheet from '../components/VaccinesSheet';
import Sidebar from '../components/Sidebar';
import useVaccinations from '../hooks/useVaccinations';
import clientVaccines from '../utils/clientVaccines';

const MainPage = () => {
    const username = localStorage.getItem('username') || 'defaultUser';
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSheet, setActiveSheet] = useState('vaccinations');
    const navigate = useNavigate();

    const {
        vaccinations,
        allVaccines,
        setVaccinations,
        fetchVaccinationsByTerm,
        fetchAllVaccines
    } = useVaccinations(username, activeSheet, searchTerm);

    const handleLogout = () => navigate('/');

    const handleAdd = async () => {
        try {
            const response = await clientVaccines.post('/vaccinations/add', {
                vaccine: {
                    name: '',
                    dose: '',
                    date: new Date().toISOString().split('T')[0]
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
            await clientVaccines.delete(`/vaccinations/delete/${id}`);
            setVaccinations(prev => prev.filter(v => v.id !== id));
        } catch (error) {
            console.error('Erro ao deletar vacina:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar
                    username={username}
                    activeSheet={activeSheet}
                    onShowVaccinations={() => {
                        setActiveSheet('vaccinations');
                        fetchVaccinationsByTerm();
                    }}
                    onShowAllVaccines={() => {
                        setActiveSheet('allVaccines');
                        fetchAllVaccines();
                    }}
                    onLogout={handleLogout}
                />

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
                                availableVaccines={allVaccines}
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
