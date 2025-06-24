import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { format } from "date-fns";
import clientVaccines from '../utils/clientVaccines';

function VaccineCard({ name }) {
  const doseOptions = [
    { label: '1ª Dose', value: '1ª Dose' },
    { label: '2ª Dose', value: '2ª Dose' },
    { label: '3ª Dose', value: '3ª Dose' },
    { label: 'Dose Única', value: 'Dose Única' },
    { label: 'Reforço', value: 'Reforço' },
  ];

  const [vaccines, setVaccines] = useState([]);
  const [editingRows, setEditingRows] = useState({});

  useEffect(() => {
    const fetchedVaccines = async () => {
      try {
        const response = await clientVaccines.get('/vaccines', { params: { username: name } });
        setVaccines(response.data);
      } catch (error) {
        console.error('Error fetching vaccines:', error);
      }
    };
    fetchedVaccines();
  }, [name]);

  const onRowEditComplete = (e) => {
    let updatedVaccines = [...vaccines];
    let { newData, index } = e;

    updatedVaccines[index] = newData;
    setVaccines(updatedVaccines);

    const updatedVaccine = {
      name: newData.name,
      dose: newData.dose,
      date: format(newData.date, 'yyyy-MM-dd'),
    };

    clientVaccines.put(`/vaccines/update/${newData.id}`, {
      username: name,
      vaccineId: newData.id,
      vaccine: updatedVaccine,
    });
  };
  


  const onRowEditChange = (e) => {
    setEditingRows(e.data);
  };

  const textEditor = (options) => (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
    />
  );
  const doseEditor = (options) => (
    <Dropdown
      value={options.value}
      options={doseOptions}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Selecione a dose"
    />
  );

  const dateEditor = (options) => (
    <Calendar
      value={options.value}
      onChange={(e) => options.editorCallback(e.value)}
      dateFormat="dd/mm/yy"
      showIcon
    />
  );

  const dateBodyTemplate = (rowData) => format(new Date(rowData.date), 'dd/MM/yyyy');

  const handleAddVaccine = () => {
    const newId = vaccines.length > 0 ? Math.max(...vaccines.map(v => v.id)) + 1 : 1;
    const newVaccine = {
      id: newId,
      name: '',
      dose: '',
      date: new Date(),
    };
    const newVaccines = [...vaccines, newVaccine];
    setVaccines(newVaccines);

    setEditingRows({ [newVaccine.id]: true });
    clientVaccines.post('/vaccines/add', {
      username: name,
      vaccine: {
        name: newVaccine.name,
        dose: newVaccine.dose,
        date: format(newVaccine.date, 'yyyy-MM-dd'),
      },
    })
  };
  const handleDeleteVaccine = (id) => {
    const updatedVaccines = vaccines.filter(vaccine => vaccine.id !== id);
    setVaccines(updatedVaccines);
    clientVaccines.delete(`/vaccines/delete`, {
      data: { username: name, vaccineId: id }
    })
      .then(() => {
        console.log('Vaccine deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting vaccine:', error);
      });
  };

  return (
    <div className="card p-4">
      <DataTable
        value={vaccines}
        editMode="row"
        dataKey="id"
        className="p-datatable-sm"
        onRowEditComplete={onRowEditComplete}
        editingRows={editingRows}
        onRowEditChange={onRowEditChange}
      >
        <Column
          field="name"
          header="Vacina"
          editor={textEditor}
        />
        <Column
          field="dose"
          header="Dose"
          body={(rowData) => rowData.dose}
          editor={doseEditor}
        />
        <Column
          field="date"
          header="Data de Aplicação"
          body={dateBodyTemplate}
          editor={dateEditor}
        />
        <Column
          rowEditor
          header="Ações"
          headerStyle={{ width: '10%', minWidth: '8rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
      </DataTable>
      <div className="flex justify-content-end mt-4">
        <Button
          label="Adicionar Vacina"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={handleAddVaccine}
        />
      </div>
    </div>
  );
}

export default VaccineCard;
