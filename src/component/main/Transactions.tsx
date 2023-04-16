import {Center, Spinner, useToast, VStack,} from "@chakra-ui/react";
import axios, {AxiosRequestConfig} from "axios";
import TransactionsTable from "../data/transaction/TransactionsTable";
import {useEffect, useState} from "react";
import {TransactionList} from "../../common/Types";

function Transactions() {
  const [transaction, setTransaction] = useState<TransactionList>();
  const [type, setType] = useState("all");
  const [reloading, setReloading] = useState(true);
  const [sortMethod, setSortMethod] = useState("newest");
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
              setTransaction(response.data as TransactionList);
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

  return (
    <>
      {transaction && transaction.data && transaction.meta ? (
        <VStack spacing="24px">
          <TransactionsTable
            data={transaction?.data}
            setSortMethod={setSortMethod}
            setReloading={setReloading}
            setType={setType}
            type={type}
            sort={sortMethod}
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
