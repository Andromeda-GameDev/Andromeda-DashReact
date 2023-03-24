import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'S1',
    puntaje: 180,
  },
  {
    name: 'S2',
    puntaje: 45,
  },
  {
    name: 'S3',
    puntaje: 120,
  },
  {
    name: 'S4',
    puntaje: 90,
  },
]

const BarChartAvgScore = (props) => {

    props.setData(data);

    return (
      <ResponsiveContainer width='88%' aspect={1}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="puntaje" fill="#008000" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export default BarChartAvgScore;
  