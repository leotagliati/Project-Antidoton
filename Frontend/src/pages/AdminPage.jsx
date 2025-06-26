import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import UsersSheet from '../components/UsersSheet';
import VaccinesSheet from '../components/VaccinesSheet';
import AdminSidebar from '../components/AdminSidebar';
import { useAdminData } from '../hooks/useAdminData';
import clientAuth from '../utils/clientAuth';
import clientVaccines from '../utils/clientVaccines';

const AdminPage = () => {
    const username = localStorage.getItem('username') || 'defaultUser';
    const navigate = useNavigate();
    const [activeSheet, setActiveSheet] = useState('users');
    const [newVaccineName, setNewVaccineName] = useState('');

    const { users, setUsers, vaccines, setVaccines } = useAdminData(activeSheet, navigate);

    const handleLogout = () => navigate('/');

    const onRowEditComplete = ({ newData, index }) => {
        const updatedUsers = [...users];
        updatedUsers[index] = newData;
        setUsers(updatedUsers);

        clientAuth.patch(`/users/${newData.username}`, { role: newData.role })
            .then(() => console.log(`Usuário ${newData.username} atualizado`))
            .catch(console.error);
    };

    const handleDeleteUser = (username) => {
        clientAuth.delete(`/users/${username}`, {
            params: { isAdmin: true }
        })
            .then(() => setUsers(prev => prev.filter(u => u.username !== username)))
            .catch(console.error);
    };

    const handleAddVaccine = () => {
        if (!newVaccineName.trim()) return;

        clientVaccines.post('/vaccines/add', { name: newVaccineName })
            .then(res => {
                setVaccines(prev => [...prev, res.data]);
                setNewVaccineName('');
            })
            .catch(console.error);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <AdminSidebar
                    username={username}
                    activeSheet={activeSheet}
                    onUsers={() => setActiveSheet('users')}
                    onVaccines={() => setActiveSheet('vaccines')}
                    onLogout={handleLogout}
                />

                <div className="col p-4">
                    {activeSheet === 'users' ? (
                        <>
                            <h2 className="mb-4">Administração de Usuários</h2>
                            <UsersSheet
                                users={users}
                                onEdit={onRowEditComplete}
                                onDelete={handleDeleteUser}
                            />
                        </>
                    ) : (
                        <>
                            <h2 className="mb-4">Vacinas Cadastradas</h2>
                            <div className="mb-4 d-flex gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nome da nova vacina"
                                    value={newVaccineName}
                                    onChange={(e) => setNewVaccineName(e.target.value)}
                                />
                                <Button label="Adicionar" icon="pi pi-plus" onClick={handleAddVaccine} />
                            </div>
                            <VaccinesSheet vaccines={vaccines} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
