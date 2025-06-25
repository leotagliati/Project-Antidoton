import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import clientAuth from './utils/clientAuth';
import UsersSheet from './components/UsersSheet';
import VaccinesSheet from './components/VaccinesSheet';

export const AdminPage = () => {
    const mockCompanyName = 'nomeEmpresa';
    const username = localStorage.getItem('username') || 'defaultUser';
    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('users'); // <- controle de exibição
    const navigate = useNavigate();

    const handleUsersButton = () => setActiveTab('users');
    const handleVaccinesButton = () => setActiveTab('vaccines');

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        if (!isAdmin) {
            navigate('/login', { replace: true });
            return;
        }

        clientAuth.get('/users', {
            params: { isAdmin: true }
        })
            .then(response => {
                const usersWithRole = response.data.map(user => ({
                    ...user,
                    role: user.isAdmin ? 'admin' : 'user'
                }));
                setUsers(usersWithRole);
            })
            .catch(error => {
                console.error('Erro ao buscar usuários:', error);
            });
    }, [navigate]);

    const handleLogout = () => navigate('/');

    const onRowEditComplete = (e) => {
        const { newData, index } = e;
        const updatedUsers = [...users];
        updatedUsers[index] = newData;
        setUsers(updatedUsers);

        clientAuth.patch(`/users/${newData.username}`, {
            role: newData.role
        })
            .then(() => {
                console.log(`Usuário ${newData.username} atualizado com sucesso`);
            })
            .catch(error => {
                console.error(`Erro ao atualizar usuário ${newData.username}:`, error);
            });
    };

    const handleDeleteUser = (username) => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';

        if (!isAdmin) {
            console.warn('Ação bloqueada: usuário não é admin');
            return;
        }

        clientAuth.delete(`/users/${username}`, {
            params: { isAdmin }
        })
            .then(() => {
                setUsers(prev => prev.filter(user => user.username !== username));
                console.log(`Usuário ${username} deletado com sucesso`);
            })
            .catch(error => {
                console.error(`Erro ao deletar usuário ${username}:`, error);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3 p-4 border min-vh-100 d-flex flex-column align-items-center gap-5">
                    {/* Logo e Nome */}
                    <div className="mb-4 d-flex flex-row align-items-center gap-2">
                        <img src="https://placehold.co/50x50" alt="Logo" className="img-fluid" />
                        <h5>{mockCompanyName}</h5>
                    </div>

                    {/* Avatar e Nome do Usuário */}
                    <img src="https://placehold.co/120x120" alt="Avatar" className="rounded-circle mb-3" />
                    <h5 className="text-center">{username}</h5>

                    {/* Botões de navegação */}
                    <div className="d-flex flex-column flex-grow-1 mt-7 gap-2 w-100">
                        <Button className="p-button-secondary w-100" onClick={handleUsersButton}>Usuários Cadastrados</Button>
                        <Button className="p-button-secondary w-100" onClick={handleVaccinesButton}>Todas as Vacinas</Button>
                    </div>

                    <Button className="p-button-danger" onClick={handleLogout}>Sair</Button>
                </div>

                {/* Conteúdo Principal */}
                <div className="col-md-9 p-4">
                    {activeTab === 'users' && (
                        <>
                            <h2 className="mb-4">Administração de Usuários</h2>
                            <UsersSheet users={users} onEdit={onRowEditComplete} onDelete={handleDeleteUser} />
                        </>
                    )}
                    {activeTab === 'vaccines' && (
                        <>
                            <h2 className="mb-4">Vacinas Cadastradas</h2>
                            <VaccinesSheet />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
