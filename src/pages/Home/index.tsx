import React, { useEffect, useState } from "react";
import LineChartComponent from "../../components/layout/Miscellaneus/LineChartComponent";
import TableHome from "../../components/layout/TableHome";
import nonRecognizedPatientService from "../../services/nonRecognizedPatientService";
import FilterableDropdown from "../../components/layout/Miscellaneus/FilterableDropdown";

interface Medicine {
  id: number;
  medicine: string;
  cylinder: string;
}

interface NonRecognized {
  patientId: string;
  createdAt: string;
}

interface PatientSelected {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [patientSelected, setPatientSelected] = useState<PatientSelected | null>(null);

  const columnsMedicine = [
    { header: "Remédio", accessor: "medicine" },
    { header: "Cilindro", accessor: "cylinder" }
  ];

  const [dataMedicine, setDataMedicine] = useState<Medicine[]>([
    { id: 1, medicine: "Paracetamol", cylinder: "1" },
    { id: 2, medicine: "Tadalafila", cylinder: "2" },
  ]);

  const columnsNonRecognized = [
    { header: "Paciente", accessor: "patient" },
    { header: "Data", accessor: "date" }
  ];

  const patientsName = [
    { id: 1, name: "Nome1" },
    { id: 2, name: "Nome2" },
    { id: 3, name: "Nome3" },
  ];

  const handleSelect = (item: PatientSelected) => {
    setPatientSelected(item);
  };

  const [dataNonRecognized, setNonRecognized] = useState<NonRecognized[]>([]);

  useEffect(() => {
    const fetchNonRecognized = async () => {
      try {
        const nrec = await nonRecognizedPatientService.all();
        setNonRecognized(nrec);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchNonRecognized();
  }, []);

  return (
    <>
      <div className="table-container">
        {patientSelected && (
          <>
            <LineChartComponent {...patientSelected} />
          </>
        )}
        <FilterableDropdown
          options={patientsName}
          onSelect={handleSelect}
          placeholder="Pesquisar pacientes..."
          displayField="name"
        />
      </div>
      <div className="table-container">
        <TableHome columns={columnsMedicine} data={dataMedicine} />
      </div>
      <div className="table-container">
        <TableHome columns={columnsNonRecognized} data={dataNonRecognized} />
      </div>
    </>
  );
};

export default Home;
