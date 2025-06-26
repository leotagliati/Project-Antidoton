import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { format, isValid, parseISO } from "date-fns";

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
      placeholder="Selecione..."
      className="w-full"
      showClear
      filter
      filterBy="label"
    />
  );

  const dateEditor = (options) => (
    <Calendar
      value={options.value ? new Date(options.value) : null}
      onChange={(e) => options.editorCallback(e.value)}
      dateFormat="dd/mm/yy"
      showIcon
      placeholder="Selecione a data"
      className="w-full"
      showButtonBar
      showClear
    />
  );

  const dateBodyTemplate = (rowData) => {
    let dateObj;
    if (typeof rowData.date === 'string') {
      dateObj = parseISO(rowData.date);
    } else {
      dateObj = new Date(rowData.date);
    }
    return isValid(dateObj) ? format(dateObj, "dd/MM/yyyy") : '-';
  };

  const actionBodyTemplate = (rowData) => (
    <div className="flex justify-content-center">
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger p-button-text"
        onClick={() => onDelete(rowData.id)}
        aria-label="Deletar vacina"
        tooltip="Deletar"
        tooltipOptions={{ position: 'top' }}
      />
    </div>
  );

  return (
    <div>
      <DataTable
        value={vaccines}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        emptyMessage="Nenhuma vacina cadastrada."
      >
        <Column
          field="name"
          header="Vacina"
          editor={(options) => dropdownEditor(options, vaccineOptions)}
          style={{ minWidth: '150px' }}
        />
        <Column
          field="dose"
          header="Dose"
          editor={(options) => dropdownEditor(options, doseOptions)}
          style={{ minWidth: '120px' }}
        />
        <Column
          field="date"
          header="Data de Aplicação"
          body={dateBodyTemplate}
          editor={dateEditor}
          style={{ minWidth: '140px' }}
        />
        <Column
          rowEditor
          header="Editar"
          style={{ width: "5rem", textAlign: "center" }}
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
          aria-label="Adicionar nova vacina"
        />
      </div>
    </div>
  );
}

export default VaccineCardSheet;
