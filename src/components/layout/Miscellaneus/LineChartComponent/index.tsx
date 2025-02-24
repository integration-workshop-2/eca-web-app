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

interface VitalSign {
  bpm: number;
  oxygenation_percentage: number;
  temperature: number;
  created_at: string;
}

interface ApiResponse {
  data: VitalSign[];
  success: boolean;
}

const LineChartComponent: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [vitalSigns, setVitalSigns] = useState<VitalSign[]>([]);

  useEffect(() => {
    axios
      .get<ApiResponse>(`http://10.42.0.1:5000/api/list_patient_vital_signs/${patientId}`)
      .then((response) => {
        if (response.data.success) {
          setVitalSigns(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar os sinais vitais:", error);
      });
  }, [patientId]);

  if (vitalSigns.length === 0) {
    return <p>Carregando ou sem dados disponíveis...</p>;
  }

  // Formatar dados para os gráficos
  const formattedData = vitalSigns.map((entry) => ({
    time: new Date(entry.created_at).toLocaleTimeString(),
    bpm: entry.bpm,
    oxygenation: entry.oxygenation_percentage,
    temperature: entry.temperature,
  }));

  return (
    <div>
      <h3>Sinais Vitais do Paciente</h3>

      {/* Gráfico de Batimentos Cardíacos */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bpm" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráfico de Oxigenação */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="oxygenation" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      {/* Gráfico de Temperatura */}
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;