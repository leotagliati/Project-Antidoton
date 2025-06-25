import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import clientAuth from './utils/clientAuth';

export const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const roleOptions = [
        { label: 'Usuário', value: 'user' },
        { label: 'Administrador', value: 'admin' },
    ];

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
                // Conversao isAdmin para role
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
            params: { isAdmin }  // acredito que isso nao seja seguro
        })
            .then(() => {
                setUsers(prevUsers => prevUsers.filter(user => user.username !== username));
                console.log(`Usuário ${username} deletado com sucesso`);
            })
            .catch(error => {
                console.error(`Erro ao deletar usuário ${username}:`, error);
            });
    };


    const roleEditor = (options) => (
        <Dropdown
            value={options.value}
            options={roleOptions}
            onChange={(e) => options.editorCallback(e.value)}
            placeholder="Selecione a função"
        />
    );

    const deleteButtonTemplate = (rowData) => (
        <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-button-text"
            onClick={() => handleDeleteUser(rowData.username)}
            aria-label={`Deletar usuário ${rowData.username}`}
        />
    );

    return (
        <div className="p-4">
            <h2 className="mb-4">Administração de Usuários</h2>
            <DataTable
                value={users}
                dataKey="username"
                editMode="row"
                onRowEditComplete={onRowEditComplete}
                className="shadow-sm"
            >
                <Column field="username" header="Usuário" />
                <Column
                    field="role"
                    header="Função"
                    editor={roleEditor}
                    body={(rowData) => rowData.role === 'admin' ? 'Administrador' : 'Usuário'}
                />
                <Column
                    rowEditor
                    header="Editar"
                    style={{ width: '4rem', textAlign: 'center' }}
                />
                <Column
                    header="Deletar"
                    body={deleteButtonTemplate}
                    style={{ width: '4rem', textAlign: 'center' }}
                />
            </DataTable>
        </div>
    );
};

export default AdminPage;
