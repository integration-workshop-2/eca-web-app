import React, { useEffect, useState } from "react";
import LineChartComponent from "../../components/layout/Miscellaneus/LineChartComponent";
import TableHome from "../../components/layout/TableHome";
import nonRecognizedPatientService from "../../services/nonRecognizedPatientService";
import FilterableDropdown from "../../components/layout/Miscellaneus/FilterableDropdown";
import alarmService from "../../services/alarmService";
import patientService from "../../services/patientService";

interface NonRecognized {
  patient_id: string;
  created_at: string;
}

interface PatientSelected {
  id: string;
  name: string;
  bpm: number;
  oxygenation_percentage: number;
  temperature: number;

}
interface patientParameters extends Omit<PatientSelected, "id" | "temperature" >{
  patient_name: string;
  date: string;
}

interface Patient {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

const Home: React.FC = () => {
  const [patientSelected, setPatientSelected] = useState<PatientSelected | null>(null);

  const patientParameterColumns = [
    { header: "Paciente", accessor: "patient_name" },
    { header: "BPM", accessor: "bpm" },
    { header: "Oxigenação (%)", accessor: "oxygenation_percentage" },
    { header: "Data", accessor: "date" }
  ];

  const [dataPatientParameters, setDataPatientParameters] = useState<patientParameters[]>([]);

  const columnsNonRecognized = [
    { header: "Paciente", accessor: "patientName" },
    { header: "Data", accessor: "created_at" }
  ];

  const [dataNonRecognized, setNonRecognized] = useState<NonRecognized[]>([]);
  const [dataPatient, setPatientName] = useState<Patient[]>([]);
  const handleSelect = (item: PatientSelected) => {
    setPatientSelected(item);
  };

  useEffect(() => {
    const fetchNonRecognized = async () => {
      try {
        const nrec: NonRecognized[] = await nonRecognizedPatientService.all(); 
        const filteredData = nrec.filter((item: NonRecognized) => item.patient_id !== null && item.patient_id !== undefined);
        setNonRecognized(filteredData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    const fetchDataPatientParameters = async () => {
      try {
        const nrec = await alarmService.all();
        setDataPatientParameters(nrec);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    const fetchPatientName = async () => {
      try {
        const name = await patientService.all();
        setPatientName(name);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchPatientName();
    fetchNonRecognized();
    fetchDataPatientParameters();

  }, []);

  const dataNonRecognizedWithPatientName = dataNonRecognized.map((item) => {
    const patient = dataPatient.find((p) => p.id === item.patient_id);
    return {
      ...item,
      patientName: patient ? patient.name : "Desconhecido",
    };
  });


  const patientsName = dataPatient.map((patient) => ({
    id: patient.id,
    name: patient.name,
    bpm: 0, // Valor padrão
    oxygenation_percentage: 0, // Valor padrão
    temperature: 0, // Valor padrão
  }));

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
        <TableHome columns={patientParameterColumns} data={dataPatientParameters} />
      </div>
      <div className="table-container">
        <TableHome columns={columnsNonRecognized} data={dataNonRecognizedWithPatientName} />
      </div>
    </>
  );
};

export default Home;
