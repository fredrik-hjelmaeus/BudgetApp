import React, { useEffect, Fragment, useState, useContext } from "react";
import Chart from "react-apexcharts";
import CssContext from "../../context/css/cssContext";

interface DonutChartProps {
  sums: number[];
  names: string[];
  colors: string[];
}

const DonutChart = ({ sums, names, colors }: DonutChartProps) => {
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
          background: "#fff",
        },
        labels: names,
        legend: {
          show: true,
          fontSize: "10px",
        },
        colors,
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                },
                value: { show: true },
                total: {
                  show: true,
                },
              },
            },
          },
        },
      });
    sums && names && setSeries(sums);
  }, [sums, names, colors, dimensions]);

  const [options, setOptions] = useState({});

  const [series, setSeries] = useState<Array<number>>([]);

  return (
    <Fragment>
      {" "}
      <Chart
        options={options}
        series={series}
        type="donut"
        height={dimensions.width > 700 ? "305px" : "205px"}
      />
    </Fragment>
  );
};

export default DonutChart;
