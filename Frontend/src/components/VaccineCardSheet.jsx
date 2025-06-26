import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { format } from "date-fns";

function VaccineCardSheet({ vaccines, onEdit, onDelete, onAdd, availableVaccines = [] }) {
  const doseOptions = [
    { label: "1ª Dose", value: "1ª Dose" },
    { label: "2ª Dose", value: "2ª Dose" },
    { label: "3ª Dose", value: "3ª Dose" },
    { label: "Dose Única", value: "Dose Única" },
    { label: "Reforço", value: "Reforço" },
  ];

  const vaccineOptions = availableVaccines.map(vac => ({
    label: vac.name,
    value: vac.name,
  }));

  const onRowEditComplete = (e) => {
    const { newData } = e;
    onEdit(newData);
  };

  const dropdownEditor = (options, list) => (
    <Dropdown
      value={options.value}
      options={list}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder="Selecione"
      className="w-full"
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

  const dateBodyTemplate = (rowData) =>
    format(new Date(rowData.date), "dd/MM/yyyy");

  const actionBodyTemplate = (rowData) => (
    <div className="flex gap-2 justify-content-center">
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-text"
        onClick={() => onDelete(rowData.id)}
      />
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <DataTable
        value={vaccines}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
      >
        <Column
          field="name"
          header="Vacina"
          editor={(options) => dropdownEditor(options, vaccineOptions)}
        />
        <Column
          field="dose"
          header="Dose"
          editor={(options) => dropdownEditor(options, doseOptions)}
        />
        <Column
          field="date"
          header="Data de Aplicação"
          body={dateBodyTemplate}
          editor={dateEditor}
        />
        <Column
          rowEditor
          header="Editar"
          style={{ width: "4rem", textAlign: "center" }}
        />
        <Column
          header="Deletar"
          body={actionBodyTemplate}
          style={{ width: "5rem", textAlign: "center" }}
        />
      </DataTable>

      <div className="flex justify-content-end mt-4">
        <Button
          label="Adicionar Vacina"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={onAdd}
        />
      </div>
    </div>
  );
}

export default VaccineCardSheet;
