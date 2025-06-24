import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function VaccineCard({ name }) {
    // Mock data for demonstration purposes
    const [age, setAge] = useState(25); // Default age for demonstration

    const [vaccines, setVaccines] = useState([
        {
            id: 1,
            name: 'COVID-19',
            date: '2023-05-10',
            dose: '1ª Dose',
        },
        {
            id: 2,
            name: 'Hepatite B',
            date: '2023-06-20',
        },
    ]);
    return (
        <div>
            <div>
                <h3>Vacinas:</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Nome da Vacina</th>
                            <th>Dose</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>

                            <InputText readOnly value="COVID-19" placeholder="Nome do Paciente" className="w-100 " />
                            </td>
                            
                            <td>
                                <InputText readOnly value="1ª Dose" className="w-100 " />
                            </td>
                            <td>
                                <InputText readOnly value="22-03-2004" className="w-100 " />
                            </td>
                            <td>
                                <Button className="btn btn-sm btn-warning me-2">✏️ Editar</Button>
                                <Button className="btn btn-sm btn-danger">🗑️ Excluir</Button>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

                <div className="mt-4">
                    <button className="btn btn-primary">➕ Adicionar Nova Vacina</button>
                </div>
            </div>
        </div>
    )
}

export default VaccineCard;