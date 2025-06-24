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

  useEffect(() => {
    const fetchedVaccines = async () => {
      try {
        const response = await clientVaccines.get('/vaccines', {
          params: { username: name }
        });
        setVaccines(response.data);
      } catch (error) {
        console.error('Error fetching vaccines:', error);
      }
    };
    fetchedVaccines();
  }, [name]);

  const onRowEditComplete = (e) => {
    const { newData, index } = e;
    const updatedVaccines = [...vaccines];
    updatedVaccines[index] = newData;
    setVaccines(updatedVaccines);

    clientVaccines.put(`/vaccines/update/${newData.id}`, {
      username: name,
      vaccineId: newData.id,
      vaccine: {
        name: newData.name,
        dose: newData.dose,
        date: format(new Date(newData.date), 'yyyy-MM-dd'),
      },
    }).then(() => {
      console.log('Vaccine updated successfully');
    }).catch((error) => {
      console.error('Error updating vaccine:', error);
    });
  };

  const handleAddVaccine = () => {
    const newVaccine = {
      name: '',
      dose: '',
      date: new Date(),
    };

    clientVaccines.post('/vaccines/add', {
      username: name,
      vaccine: {
        name: newVaccine.name,
        dose: newVaccine.dose,
        date: format(newVaccine.date, 'yyyy-MM-dd'),
      },
    }).then(response => {
      // Supondo que response.data é o objeto da vacina criada, com id incluído
      const createdVaccine = response.data;
      setVaccines((prev) => [...prev, createdVaccine]);
    }).catch((error) => {
      console.error('Error adding vaccine:', error);
    });
  };


  const handleDeleteVaccine = (id) => {
    const updatedVaccines = vaccines.filter(vaccine => vaccine.id !== id);
    setVaccines(updatedVaccines);

    clientVaccines.delete(`/vaccines/delete/${id}`, {
      data: { username: name, vaccineId: id },
    }).then(() => {
      console.log('Vaccine deleted successfully');
    }).catch((error) => {
      console.error('Error deleting vaccine:', error);
    });
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

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2 justify-content-center">
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-text"
        onClick={() => handleDeleteVaccine(rowData.id)}
      />
    </div>
  );

  return (
    <div className="card p-4">
      <DataTable
        value={vaccines}
        editMode="row"
        dataKey="id"
        className="p-datatable-sm"
        onRowEditComplete={onRowEditComplete}
      >
        <Column field="name" header="Vacina" editor={textEditor} />
        <Column field="dose" header="Dose" editor={doseEditor} />
        <Column field="date" header="Data de Aplicação" body={dateBodyTemplate} editor={dateEditor} />
        <Column
          rowEditor
          header="Editar"
          style={{ width: '4rem', textAlign: 'center' }}
        />
        <Column
          header="Deletar"
          body={actionBodyTemplate}
          style={{ width: '5rem', textAlign: 'center' }}
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
