import React, { useEffect, Fragment, useState } from 'react';
import Chart from 'react-apexcharts';

const DonutChart = ({ sums, names, colors }) => {
  useEffect(() => {
    sums &&
      names &&
      setOptions({
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          },
          background: '#fff'
        },
        labels: names,
        legend: {
          show: true,
          fontSize: '10px'
        },
        colors,
        dataLabels: {
          enabled: true
        }
      });
    sums && names && setSeries(sums);
  }, [sums, names]);

  // console.log(categorysumonlyposnumbyyear, categorynameonlyposnumbyyear);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  return (
    <Fragment>
      {' '}
      <Chart options={options} series={series} type='donut' height='305px' />
    </Fragment>
  );
};

export default DonutChart;
