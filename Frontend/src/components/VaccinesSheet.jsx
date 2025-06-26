import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const VaccinesSheet = ({ vaccines }) => {

    return (
        <div>
            {/* Tabela de vacinas */}
            <DataTable
                value={vaccines}
                dataKey="id"
                className="shadow-sm"
            >
                <Column field="id" header="ID" style={{ width: '5rem' }} />
                <Column field="name" header="Nome da Vacina" />
            </DataTable>
        </div>
    );
};

export default VaccinesSheet;
