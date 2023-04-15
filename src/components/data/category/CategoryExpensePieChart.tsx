import { useEffect, useState } from "react";
import {
  AccountList,
  ExpenseCategory,
  ExpenseCategories,
  ExpenseCategoriesProp,
} from "../../../common/Types";
import Chart from "react-apexcharts";
import { Box, Flex, Heading, IconButton, Select } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const CategoryExpensePieChart = ({
  categories,
  setSortMethod,
  setReloading,
}: ExpenseCategoriesProp) => {
  const options = {
    labels: categories.map((category) => category.category),
    colors: [
      "#31C48D",
      "#384B41",
      "#9BB0A5",
      "#00BBFF",
      "#0086D0",
      "#386C5F",
      "#003911",
    ],
    legend: {
      fontSize: "16px",
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return `$${value.toLocaleString()}`;
        },
      },
    },
  };
  const series = categories.map((category) => category.total);

  const handleSort = (option: string) => {
    setSortMethod(option);
    setReloading(true);
  };

  const pieChartTotal = (categories: ExpenseCategory[]) => {
    let categoriesTotal = 0;
    for (const category of categories) {
      categoriesTotal += category.total;
    }

    return categoriesTotal;
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      p="4"
      boxShadow="lg"
      width="50%"
      height="450"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Heading as="h2" size="md">
          Expense Breakdown
        </Heading>
        <Box>
          <Select
            defaultValue="month"
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
            <option value="all">Lifetime</option>
          </Select>
        </Box>
      </Flex>
      {categories.length !== 0 && pieChartTotal(categories) !== 0 ? (
        <Chart options={options} series={series} type="pie" height="85%" />
      ) : (
        <Box alignItems="center" height={350} textAlign="center">
          No categories available for display... keep recording your expenses to
          see the pie chart in action! 💵
        </Box>
      )}
    </Box>
  );
};

export default CategoryExpensePieChart;
