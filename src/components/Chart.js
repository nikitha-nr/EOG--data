import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import Card from '../components/Card';

export default function Chart() {
  const [dataArr, dataCon] = useState([]);
   const multiData = useSelector(state => state.multipleData.multipleData);
   const waterTempData = useSelector(state => state.waterTemp.waterTempData);
   const activeMetrics = useSelector(state => state.activeMetrics.selectedMetrics);

  const filterByActive = data => {
    for (let i = 0; i < activeMetrics.length; i++) {
      if (data.metric === activeMetrics[i].metricName) {
        return true;
      }
    }
  };

  const dataForChart = dataArr.filter(filterByActive);

  useEffect(() => {
    if (multiData.length > 0) {
      return dataCon([
        {
          metric: 'waterTemp',
          measurements: multiData[0].measurements.concat(waterTempData),
        },
      ]);
    }
  }, 
  [waterTempData, multiData]);
  const names = {
    
    waterTemp: 'Water Temp',
    default: 'metric',
  };

  const colors = {
    waterTemp: '#830BEE',
    default: '#00FFE0',
  };

  return (
    <>
      {activeMetrics.map(i => {
         if (i.metricName === waterTempData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${waterTempData[waterTempData.length - 1].value} ${waterTempData[0].unit}`}
            />
          );
       
         }
      })}
      <LineChart width={1000} height={500}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend layout="vertical" verticalAlign="middle" align="right" />
        {dataForChart.map(i => {
          return (
            <Line
              dataKey="value"
              data={i.measurements}
              name={names[i.metric]}
              key={i.metric}
              dot={false}
              stroke={colors[i.metric]}
            />
          );
        })}
      </LineChart>
    </>
  );
}
