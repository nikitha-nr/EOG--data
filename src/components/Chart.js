import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import Card from '../components/Card';

export default function Chart() {
  const [dataArr, dataCon] = useState([]);
   const multiData = useSelector(state => state.multipleData.multipleData);
   const waterTempData = useSelector(state => state.waterTemp.waterTempData);
   const activeMetrics = useSelector(state => state.activeMetrics.selectedMetrics);
   const oilTempData = useSelector(state => state.oilTemp.oilTempData);
   const casingPressureData = useSelector(state => state.casingPressure.casingPressureData);
   const flareTempData = useSelector(state => state.flareTemp.flareTempData);
   const tubingPressureData = useSelector(state => state.tubingPressure.tubingPressureData);
   const injValveData = useSelector(state => state.injValve.injValveData);

  
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
        {
          metric: 'oilTemp',
          measurements: multiData[1].measurements.concat(oilTempData),
        },
        {
          metric: 'casingPressure',
          measurements: multiData[2].measurements.concat(casingPressureData),
        },
        {
          metric: 'flareTemp',
          measurements: multiData[3].measurements.concat(flareTempData),
        },
        {
        metric: 'tubingPressure',
        measurements: multiData[4].measurements.concat(tubingPressureData),
      },
      {
        metric: 'injValveOpen',
        measurements: multiData[5].measurements.concat(injValveData),
      },
      ]);
    }
  }, 
  [waterTempData, multiData,oilTempData,casingPressureData,flareTempData,injValveData]);
  const names = {
    injValveOpen: 'INJ Valve Open',
    waterTemp: 'Water Temp',
    default: 'metric',
    oilTemp: 'Oil Temp',
    casingPressure: 'Casing Pressure',
    flareTemp: 'Flare Temp',
    tubingPressure:'Tubing Pressure'
  };

  const colors = {
    waterTemp: '#830BEE',
    default: '#00FFE0',
    oilTemp: '#000000',
    casingPressure: '#000CFF',
    flareTemp: '#FFB201',
    tubingPressure:'green',
    injValveOpen: '#1BD82A',
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
          }else if (i.metricName === oilTempData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${oilTempData[oilTempData.length - 1].value} ${oilTempData[0].unit}`}
            />
          );
        } else if (i.metricName === casingPressureData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${casingPressureData[casingPressureData.length - 1].value} ${casingPressureData[0].unit}`}
            />
          );
        } else if (i.metricName === flareTempData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${flareTempData[flareTempData.length - 1].value} ${flareTempData[0].unit}`}
            />
          );
        } else if (i.metricName === tubingPressureData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${tubingPressureData[tubingPressureData.length - 1].value} ${flareTempData[0].unit}`}
            />
          );
        } 
          else if (i.metricName === injValveData[0].metric) {
          return (
            <Card
              color={colors[i.metricName]}
              metric={names[i.metricName]}
              data={`${injValveData[injValveData.length - 1].value}${injValveData[0].unit}`}
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
