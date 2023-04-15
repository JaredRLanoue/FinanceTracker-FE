import {
  Box,
  Center,
  ChakraProvider,
  HStack,
  Spinner,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import SidebarWithHeader from "../navigation/SidebarWithHeader";
import CategoryExpensePieChart from "../data/category/CategoryExpensePieChart";
import { useEffect, useState } from "react";
import {
  AccountList,
  Category,
  CategoryList,
  ExpenseCategories,
  ExpenseCategory,
} from "../../common/Types";
import CategoryExpenseTable from "../data/category/CategoryExpenseTable";
import { BudgetProgressBars } from "../data/category/CategoryExpenseBudgetProgress";

const Categories = () => {
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>();
  const [budget, setBudget] = useState<ExpenseCategory[]>([]);
  const [sortMethod, setSortMethod] = useState("month");
  const [reloading, setReloading] = useState(true);
  const jwt = localStorage.getItem("token");
  const toast = useToast();

  // expense categories pie chart and future progress bar chart
  useEffect(() => {
    if (jwt) {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      if (reloading) {
        Promise.all([
          axios.get(
            "http://localhost:8080/api/v1/auth/expense/categories/budgets?sortMethod=" +
              sortMethod,
            { headers }
          ),
          axios.get("http://localhost:8080/api/v1/auth/expense/categories", {
            headers,
          }),
          axios.get(
            "http://localhost:8080/api/v1/auth/expense/categories/budgets?sortMethod=month",
            { headers }
          ),
        ])
          .then(
            ([expensesResponse, expenseCategoriesResponse, budgetResponse]) => {
              if (expensesResponse.data && expensesResponse.data.categories) {
                setCategories(expensesResponse.data.categories);
              }
              if (expenseCategoriesResponse.data) {
                setExpenseCategories(expenseCategoriesResponse.data.categories);
              }
              if (budgetResponse.data) {
                console.log(sortMethod);
                setBudget(budgetResponse.data.categories);
              }
            }
          )
          .catch(() => {
            toast({
              title: "Connection to the server has been lost!",
              status: "error",
              isClosable: true,
              position: "bottom",
              variant: "subtle",
            });
          })
          .finally(() => {
            setReloading(false);
          });
      }
    } else {
      toast({
        title: "Issue with login credentials, please sign in again!",
        status: "error",
        isClosable: true,
        position: "bottom",
        variant: "subtle",
      });
    }
  }, [jwt, reloading]);

  return categories && expenseCategories ? (
    <VStack spacing="24px">
      <HStack spacing="24px" height="100%" width="100%">
        <CategoryExpensePieChart
          categories={categories}
          setSortMethod={setSortMethod}
          setReloading={setReloading}
        />
        <BudgetProgressBars
          categories={budget}
          setSortMethod={setSortMethod}
          setReloading={setReloading}
        />
      </HStack>
      <CategoryExpenseTable
        categories={expenseCategories}
        setReloading={setReloading}
      />
    </VStack>
  ) : (
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>
  );
};

export default Categories;
