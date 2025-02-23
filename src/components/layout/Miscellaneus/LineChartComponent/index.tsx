import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  name: string;
  value: number;
}

interface PatientVitals {
  id: string;
  name: string;
  bpm?: number[];
  oxygenation_percentage?: number[];
  temperature?: number[];
}

const LineChartComponent: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [patientData, setPatientData] = useState<PatientVitals | null>(null);

  useEffect(() => {
    axios
      .get(`http://seu-backend.com/list_patient_vital_signs/${patientId}`)
      .then((response) => {
        setPatientData(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os sinais vitais:", error);
      });
  }, [patientId]);

  if (!patientData || !patientData.bpm || !patientData.oxygenation_percentage || !patientData.temperature) {
    return <p>Carregando ou sem dados disponíveis...</p>;
  }

  const formatData = (dataArray: number[] | undefined, label: string): DataPoint[] => {
    if (!dataArray || dataArray.length === 0) {
      return [{ name: "Sem dados", value: 0 }];
    }
    return dataArray.map((value, index) => ({
      name: `${label} ${index + 1}`,
      value,
    }));
  };

  const bpmData = formatData(patientData.bpm, "BPM");
  const oxygenData = formatData(patientData.oxygenation_percentage, "Oxigenação");
  const tempData = formatData(patientData.temperature, "Temperatura");

  return (
    <div>
      <h3>{patientData.name}</h3>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={bpmData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={oxygenData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={tempData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
