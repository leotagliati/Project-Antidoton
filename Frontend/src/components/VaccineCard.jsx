import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { format } from "date-fns";

function VaccineCard({ name }) {
    const doseOptions = [
        { label: '1ª Dose', value: '1ª Dose' },
        { label: '2ª Dose', value: '2ª Dose' },
        { label: '3ª Dose', value: '3ª Dose' },
        { label: 'Dose Única', value: 'Dose Única' },
        { label: 'Reforço', value: 'Reforço' },
    ];
    
    const [vaccines, setVaccines] = useState([
        
      // mock data das vacinas
    {
      id: 1,
      name: 'COVID-19',
      date: new Date('2023-05-10'),
      dose: '1ª Dose',
    },
    {
      id: 2,
      name: 'Hepatite B',
      date: new Date('2023-06-20'),
      dose: '2ª Dose',
    },
  ]);

  const onRowEditComplete = (e) => {
    let updatedVaccines = [...vaccines];
    let { newData, index } = e;

    updatedVaccines[index] = newData;
    setVaccines(updatedVaccines);
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  const doseEditor = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={doseOptions}
        onChange={(e) => options.editorCallback(e.value)}
        placeholder="Selecione a dose"
      />
    );
  };

  const dateEditor = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.editorCallback(e.value)}
        dateFormat="dd/mm/yy"
        showIcon
      />
    );
  };

  const dateBodyTemplate = (rowData) => {
    return format(new Date(rowData.date), 'dd/MM/yyyy');
  };

  return (
    <div className="card p-4">
      <DataTable
        value={vaccines}
        editMode="row"
        dataKey="id"
        className="p-datatable-sm"
        onRowEditComplete={onRowEditComplete}
      >
        <Column
          field="name"
          header="Vacina"
          editor={(options) => textEditor(options)}
        />
        <Column
          field="dose"
          header="Dose"
          body={(rowData) => rowData.dose}
          editor={(options) => doseEditor(options)}
        />
        <Column
          field="date"
          header="Data de Aplicação"
          body={dateBodyTemplate}
          editor={(options) => dateEditor(options)}
        />
        <Column
          rowEditor
          header="Ações"
          headerStyle={{ width: '10%', minWidth: '8rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
}

export default VaccineCard;