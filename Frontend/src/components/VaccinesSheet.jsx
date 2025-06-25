import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const VaccinesSheet = ({ vaccines, onEdit, onDelete }) => {
    const nameEditor = (options) => (
        <InputText
            value={options.value}
            onChange={(e) => options.editorCallback(e.target.value)}
            placeholder="Digite o nome da vacina"
        />
    );

    const deleteButtonTemplate = (rowData) => (
        <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger p-button-text"
            onClick={() => onDelete(rowData.id)}
            aria-label={`Deletar vacina ${rowData.name}`}
        />
    );

    return (
        <DataTable
            value={vaccines}
            dataKey="id"
            editMode="row"
            onRowEditComplete={onEdit}
            className="shadow-sm"
        >
            <Column field="id" header="ID" style={{ width: '5rem' }} />
            <Column
                field="name"
                header="Nome da Vacina"
                editor={nameEditor}
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

export default VaccinesSheet;
