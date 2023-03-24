import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'S1',
    tiempo: 180,
  },
  {
    name: 'S2',
    tiempo: 45,
  },
  {
    name: 'S3',
    tiempo: 120,
  },
  {
    name: 'S4',
    tiempo: 90,
  },
]

const BarChartAvgTime = (props) => {
    
    props.setData(data);

    return (
      <ResponsiveContainer width='88%' aspect={1}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="tiempo" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export default BarChartAvgTime;
  