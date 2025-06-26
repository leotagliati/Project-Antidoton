import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const roleOptions = [
    { label: 'Usuário', value: 'user' },
    { label: 'Administrador', value: 'admin' },
];

const UsersSheet = ({ users, onEdit, onDelete }) => {
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
            onClick={() => onDelete(rowData.username)}
            aria-label={`Deletar usuário ${rowData.username}`}
        />
    );

    return (
        <DataTable
            value={users}
            dataKey="username"
            editMode="row"
            onRowEditComplete={onEdit}
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
    );
};

export default UsersSheet;
