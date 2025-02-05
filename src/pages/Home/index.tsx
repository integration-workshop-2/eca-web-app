import React, { useEffect, useRef, useState } from "react";
import LineChartComponent from "../../components/layout/Miscellaneus/LineChartComponent";
import TableHome from "../../components/layout/TableHome";
import nonRecognizedPatientService from "../../services/nonRecognizedPatientService";

interface Medicine{
  id: number;
  medicine: string;
  cylinder: string;
}

interface NonRecognized {
  patientId: string;
  createdAt: string;
  //updatedAt: string;
}
const Home: React.FC = () => {
  const columnsMedicine = [
    { header: "Remédio", accessor: "medicine" },
    { header: "Cilindro", accessor: "cylinder" }
  ];
  const [dataMedicine, setDataMedicine] = useState<Medicine[]>([
    { id: 1, medicine: "Paracetamol", cylinder: "1" },
    { id: 2, medicine: "Tadalafila", cylinder: "2" },
  ]);

  const columnsNonRecognized = [
    {header: "Paciente", accessor: "patient"},
    {header: "Data", accessor: "date"}
  ];

  const [dataNonRecognized, setNonRecognized] = useState<NonRecognized[]>([]);
  useEffect(()=>{
    async function fetchNonRecognized(){
      try{
        const nrec = await nonRecognizedPatientService.all();
        setNonRecognized(nrec);
      }catch(error){
        console.log(error);
      }
      fetchNonRecognized();
    }
  }, []);
  console.log(dataNonRecognized)
  return (
    <>
      <div className="table-container">
        <LineChartComponent />
        <LineChartComponent />
      </div>
      <div className="table-container">
        
        <TableHome
          columns={columnsMedicine}
          data={dataMedicine}
        />
      </div>
      <div className="table-container">
       
        <TableHome
          columns={columnsNonRecognized}
          data={dataNonRecognized}
        />
      </div>

    </>
  );
};

export default Home;