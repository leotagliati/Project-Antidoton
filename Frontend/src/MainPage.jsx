import React, { useEffect, useState } from 'react';
import VaccineCardSheet from './components/VaccineCardSheet';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import clientVaccines from './utils/clientVaccines';
import { useNavigate, Navigate } from 'react-router-dom';

export const MainPage = () => {
    const mockCompanyName = 'nomeEmpresa';
    const username = localStorage.getItem('username') || 'defaultUser';

    const [searchTerm, setSearchTerm] = useState('');
    const [vacinas, setVacinas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVacinasPorTermo = async () => {
            if (searchTerm.trim() !== '') {
                try {
                    const response = await clientVaccines.get('/vaccinations/search', {
                        params: { username: username, vaccineName: searchTerm }
                    });
                    setVacinas(response.data);
                } catch (error) {
                    console.error('Erro ao buscar vacinas:', error);
                    setVacinas([]);
                }
            } else {
                try {
                    const response = await clientVaccines.get('/vaccinations', {
                        params: { username: username }
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
    const handleLogout = () => {
        navigate('/')
    }

    const handleAdd = async () => {
        const novaVacina = {
            name: '',
            dose: '',
            date: new Date()
        };

        try {
            const response = await clientVaccines.post('/vaccinations/add', {
                username: username,
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
            await clientVaccines.put(`/vaccinations/update/${novaVacina.id}`, {
                username: username,
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
            await clientVaccines.delete(`/vaccinations/delete/${id}`, {
                data: { username: username, vaccineId: id }
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
                    {/* Logo da Empresa */}
                    <div className="mb-4 d-flex flex-row align-items-center gap-2">
                        <img src="https://placehold.co/50x50" alt="Logo" className="img-fluid" />
                        <h5>{mockCompanyName}</h5>
                    </div>

                    {/* Avatar */}
                    <img src="https://placehold.co/120x120" alt="Avatar" className="rounded-circle mb-3" />
                    <h5 className="text-center">{username}</h5>
                    
                    {/* Botões de Navegação */}
                    <div className="d-flex flex-column flex-grow-1 mt-7 gap-2 w-100">
                        <Button className="p-button-secondary w-100">Minhas Vacinações</Button>
                        <Button className="p-button-secondary w-100">Todas as Vacinas</Button>
                    </div>

                    <Button className="p-button-danger" onClick={handleLogout}>Sair</Button>
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

                    <VaccineCardSheet vacinas={vacinas} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd} />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
