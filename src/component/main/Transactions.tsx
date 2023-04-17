import {Center, HStack, Spinner, useToast, VStack} from "@chakra-ui/react";
import axios, {AxiosRequestConfig} from "axios";
import TransactionsTable from "../data/transaction/TransactionsTable";
import {useEffect, useState} from "react";
import {AccountList, CategoryList, TransactionChartView, TransactionList,} from "../../common/Types";
import TransactionChart from "../data/transaction/TransactionChart";

function Transactions() {
  const [transaction, setTransaction] = useState<TransactionList>();
  const [type, setType] = useState("all");
  const [reloading, setReloading] = useState(true);
  const [sortMethod, setSortMethod] = useState("newest");
  const [accounts, setAccounts] = useState<AccountList>();
  const [incomeCategories, setIncomeCategories] = useState<CategoryList | null>(
    null
  );
  const [expenseCategories, setExpenseCategories] =
    useState<CategoryList | null>(null);
  const [charts, setCharts] = useState<TransactionChartView>();
  const jwt = localStorage.getItem("token");
  const toast = useToast();

  useEffect(() => {
    if (jwt) {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      if (reloading) {
        console.log("STARTING TABLE");
        axios
          .get(
            "http://localhost:8080/api/v1/auth/transactions?sortMethod=" +
              sortMethod +
              "&type=" +
              type,
            { headers }
          )
          .then((response) => {
            if (
              response.data.data.length > 0 &&
              response.data.meta != undefined
            ) {
              setTransaction(response.data);
              // console.log(response.data);
            } else {
              setTransaction({
                data: [],
                meta: {
                  totalExpenses: 0,
                  totalIncomes: 0,
                  averageTransaction: 0,
                },
              });
            }
          })
          .catch(() => {
            toast({
              title: "Connection to the server has been lost!",
              status: "error",
              isClosable: true,
              position: "bottom",
              variant: "subtle",
            });
            setTransaction({
              data: [],
              meta: {
                totalExpenses: 0,
                totalIncomes: 0,
                averageTransaction: 0,
              },
            });
          })
          .finally(() => {
            setReloading(false);
          });
      }
    }
  }, [jwt, reloading]);

  useEffect(() => {
    const fetchCategoriesAndAccounts = async () => {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      const incomeUrl = "http://localhost:8080/api/v1/auth/income/categories";
      const expenseUrl = "http://localhost:8080/api/v1/auth/expense/categories";
      const accountsUrl = "http://localhost:8080/api/v1/auth/accounts";
      const chartsUrl = "http://localhost:8080/api/v1/auth/transactions/chart";

      try {
        const [
          incomeResponse,
          expenseResponse,
          accountsResponse,
          chartResponse,
        ] = await Promise.all([
          axios.get<CategoryList>(incomeUrl, { headers }),
          axios.get<CategoryList>(expenseUrl, { headers }),
          axios.get<AccountList>(accountsUrl, { headers }),
          axios.get<TransactionChartView>(chartsUrl, { headers }),
        ]);

        setIncomeCategories(incomeResponse.data);
        setExpenseCategories(expenseResponse.data);
        setAccounts(accountsResponse.data);
        setCharts(chartResponse.data);
      } catch (error) {
        console.log("Error fetching categories and accounts:", error);
      }
    };

    fetchCategoriesAndAccounts();
  }, [jwt, reloading]); // move chart into the other function and remove reloading from here

  return (
    <>
      {transaction &&
      transaction.data &&
      transaction.meta &&
      accounts &&
      charts ? (
        <VStack spacing="24px">
          <HStack spacing="24px" height="100%" width="100%">
            <TransactionChart chart={charts} />
          </HStack>
          <TransactionsTable
            data={transaction.data}
            setSortMethod={setSortMethod}
            setReloading={setReloading}
            setType={setType}
            type={type}
            sort={sortMethod}
            accounts={accounts}
            incomeCategories={incomeCategories}
            expenseCategories={expenseCategories}
          />
        </VStack>
      ) : (
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      )}
    </>
  );
}

export default Transactions;
