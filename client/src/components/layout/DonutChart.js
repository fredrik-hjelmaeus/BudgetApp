import React, { useEffect, Fragment, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import CssContext from '../../context/css/cssContext';

const DonutChart = ({ sums, names, colors }) => {
  const cssContext = useContext(CssContext);
  const { dimensions } = cssContext;
  useEffect(() => {
    sums &&
      names &&
      setOptions({
        chart: {
          toolbar: {
            show: false,
          },
          sparkline: {
            enabled: true,
          },
          background: '#fff',
        },
        labels: names,
        legend: {
          show: true,
          fontSize: '10px',
        },
        colors,
        dataLabels: {
          enabled: true,
        },
      });
    sums && names && setSeries(sums);
  }, [sums, names, colors, dimensions]);

  // console.log(categorysumonlyposnumbyyear, categorynameonlyposnumbyyear);
  const [options, setOptions] = useState({});

  const [series, setSeries] = useState([]);

  return (
    <Fragment>
      {' '}
      <Chart
        options={options}
        series={series}
        type='donut'
        height={dimensions.width > 700 ? '305px' : '205px'}
      />
    </Fragment>
  );
};

export default DonutChart;
