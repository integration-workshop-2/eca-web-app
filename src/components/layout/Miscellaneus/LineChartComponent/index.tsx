import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}
interface patientSelected {
  id: string;
  name: string;
}

const data: DataPoint[] = [
  { name: 'Jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Fev', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Abr', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Mai', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Jul', uv: 3490, pv: 4300, amt: 2100 },
];

const LineChartComponent: React.FC<patientSelected> = ({id, name}) => {
  return (
    <>
      <p>{id} {name}</p>
    <ResponsiveContainer width="100%" height={250}>
    
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
};

export default LineChartComponent;