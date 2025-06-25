import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
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
      // Redireciona para login se não for admin
      navigate('/login', { replace: true });
      return;
    }

    // Se for admin, busca os usuários
    clientAuth.get('/users', {
      params: { isAdmin: true }
    })
      .then(response => {
        setUsers(response.data);
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

  const roleEditor = (options) => (
    <Dropdown
      value={options.value}
      options={roleOptions}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Selecione a função"
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
      </DataTable>
    </div>
  );
};

export default AdminPage;
