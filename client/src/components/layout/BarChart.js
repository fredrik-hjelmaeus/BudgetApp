import React, { useEffect, Fragment, useState, useContext } from 'react';
import Chart from 'react-apexcharts';
import PresetContext from '../../context/preset/presetContext';

const BarChart = () => {
  const presetContext = useContext(PresetContext);
  const { AllMonthSum, presets } = presetContext;
  useEffect(() => {
    setOptions({
      //döljer menu
      chart: {
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: false
        },
        background: '#fff'
      },
      // lägger in kategorier som styr antalet staplar som visas
      xaxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        // labels är text på x-axeln, döljs
        labels: {
          show: false
        },
        // taggar på x-axels linje
        axisTicks: {
          show: false
        },
        // x-axelns linje, döljs
        axisBorder: {
          show: true,
          color: '#000000',
          offsetY: -74
        }
      },
      // text döljs på y-axeln
      yaxis: {
        labels: {
          show: false
        },
        tickAmount: 6
      },
      // text på staplarna, döljs
      dataLabels: {
        enabled: false
      },
      // färg på staplarna
      fill: {
        colors: ['#000']
      },
      // visuella hjälplinjer i stapelytan
      grid: {
        show: false,
        borderColor: '#000000',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: false
          },
          row: {
            colors: ['#333333'],
            opacity: 1
          },
          column: {
            colors: ['#333333'],
            opacity: 1
          },
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
          }
        }
      },
      legend: {
        show: true
      }
    }); // end setOptions
    setSeries([
      {
        name: 'Monthly Balance',
        data: AllMonthSum
      }
    ]);
  }, [presets, AllMonthSum]);

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([
    { name: 'Monthly Balance', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ]);

  return (
    <Fragment>
      <Chart
        options={options}
        series={series}
        type='bar'
        height='230px'
        width='100%'
      />
    </Fragment>
  );
};

export default BarChart;
