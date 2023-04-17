import React from "react";
import {Box, Flex, Heading,} from "@chakra-ui/react";
import Chart from "react-apexcharts";
import {ApexOptions} from "apexcharts";
import {TransactionChartProp} from "../../../common/Types";

const TransactionChart = ({ chart }: TransactionChartProp) => {
  const expenses = chart.charts.expenses.map((chart) => ({
    x: new Date(chart.date),
    y: Number(chart.value),
  }));
  const incomes = chart.charts.incomes.map((chart) => ({
    x: new Date(chart.date),
    y: Number(chart.value),
  }));

  const options: ApexOptions = {
    chart: {
      animations: {
        // TODO: Possibly remove, performance/animation is bad once data gets to be large?
        enabled: false,
      },
      // dropShadow: {
      //     enabled: true,
      //     top: -2,
      //     left: 2,
      //     blur: 5,
      //     opacity: 0.06
      // },
      type: "area",
      height: 300,
      zoom: {
        enabled: true,
        autoScaleYaxis: false,
      },
      foreColor: "#333",
      stacked: false,
    },
    colors: ["#23C552", "#F84F31"],
    // fill: {
    //     type: "solid",
    //     opacity: 0.7
    // },
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: false,
        opacityFrom: 0.75,
        opacityTo: 0,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    series: [
      {
        name: "Incomes",
        data: incomes,
      },
      {
        name: "Expenses",
        data: expenses,
      },
    ],
    markers: {
      size: 0,
      strokeWidth: 3,
      strokeOpacity: 1,
      fillOpacity: 1,
      hover: {
        size: 6,
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "16px",
        },
        formatter: function (value) {
          return "$" + value.toFixed(2);
        },
      },
      tooltip: {
        enabled: true,
      },
      forceNiceScale: true,
      min: 0,
    },
    grid: {
      padding: {
        left: -5,
        right: 5,
      },
    },
    tooltip: {
      x: {
        format: "MMM yyyy",
      },
    },
    legend: {
      position: "top",
      fontSize: "16px",
    },
    // fill: {
    //     type: "solid",
    //     gradient: {
    //         shade: "light",
    //         type: "vertical",
    //         shadeIntensity: 0.25,
    //         gradientToColors: undefined,
    //         inverseColors: true,
    //         opacityFrom: 0.7,
    //         opacityTo: 0.5,
    //         stops: [0, 100],
    //         colorStops: []
    //     },
    // }
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      p="4"
      boxShadow="lg"
      width="100%"
      height="450"
      overflowY="auto"
      zIndex="0"
    >
      <Flex justify="space-between" align="center" mb="4" width="100%">
        <Heading as="h2" size="md">
          Transactions Chart
        </Heading>
        <Box />
      </Flex>
      {incomes.length > 2 || expenses.length > 2 ? (
        <Box className="chart-animation">
          <Chart
            options={options}
            series={options.series}
            type="area"
            height={350}
          />
        </Box>
      ) : (
        <Box alignItems="center" height={350} textAlign="center">
          Not enough transaction available for display... keep recording your
          transactions to see the chart in action! 💵
        </Box>
      )}
    </Box>
  );
};

export default TransactionChart;
