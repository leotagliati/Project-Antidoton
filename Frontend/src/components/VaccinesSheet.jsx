import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';

const VaccinesSheet = ({ vaccines }) => {
    const [globalFilter, setGlobalFilter] = useState('');

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <div className="mb-3 p-input-icon-left" style={{ maxWidth: 300 }}>
                <div
                    className="p-input-icon-left"
                    style={{ width: '100%', maxWidth: '600px' }}
                >
                    <i className="pi pi-search px-2" />
                    <InputText
                        placeholder="Buscar vacina"
                        className="px-5 w-100"
                        style={{
                            borderRadius: '8px',
                            borderColor: '#ced4da',
                            padding: '0.75rem',
                        }}
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>
            </div>

            <DataTable
                value={vaccines}
                dataKey="id"
                className="p-datatable-sm"
                paginator
                rows={10}
                globalFilter={globalFilter}
                emptyMessage="Nenhuma vacina encontrada."
            >
                <Column field="id" header="ID" style={{ width: '5rem' }} />
                <Column field="name" header="Nome da Vacina" />
            </DataTable>
        </div>
    );
};

export default VaccinesSheet;
