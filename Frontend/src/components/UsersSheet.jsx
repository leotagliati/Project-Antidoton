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
            className="w-full"
        />
    );

    const roleBodyTemplate = (rowData) =>
        rowData.role === 'admin' ? 'Administrador' : 'Usuário';

    const deleteButtonTemplate = (rowData) => (
        <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-button-text"
            onClick={() => onDelete(rowData.username)}
            tooltip="Remover usuário"
            tooltipOptions={{ position: 'top' }}
            aria-label={`Deletar usuário ${rowData.username}`}
        />
    );

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <DataTable
                value={users}
                dataKey="username"
                editMode="row"
                onRowEditComplete={onEdit}
                emptyMessage="Nenhum usuário encontrado."
                responsiveLayout="scroll"
            >
                <Column field="username" header="Usuário" style={{ minWidth: '10rem' }} />
                <Column
                    field="role"
                    header="Função"
                    editor={roleEditor}
                    body={roleBodyTemplate}
                    style={{ minWidth: '10rem' }}
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

export default UsersSheet;
