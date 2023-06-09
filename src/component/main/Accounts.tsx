import {Center, HStack, Spinner, useToast, VStack} from "@chakra-ui/react";
import axios, {AxiosRequestConfig} from "axios";
import {useEffect, useState} from "react";
import StatBox from "../data/account/StatBox";
import {AccountList} from "../../common/Types";
import AccountsTable from "../data/account/AccountsTable";

function Accounts() {
  const [accountData, setAccountData] = useState<AccountList>();
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
        axios
          .get(
            "http://localhost:8080/api/v1/auth/accounts?sortMethod=" +
              sortMethod,
            { headers }
          )
          .then((response) => {
            if (
              response.data.data.length > 0 &&
              response.data.meta != undefined
            ) {
              setAccountData(response.data as AccountList);
            } else {
              setAccountData({
                data: [],
                meta: { total: 0, average: 0, netWorth: 0 },
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
            setAccountData({
              data: [],
              meta: { total: 0, average: 0, netWorth: 0 },
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
      {accountData && accountData.data && accountData.meta ? (
        <VStack spacing="24px">
          <HStack spacing="24px">
            <StatBox
              label={"Total Accounts"}
              number={accountData?.meta.total}
            />
            <StatBox label={"Net Worth"} number={accountData?.meta.netWorth} />
            <StatBox
              label={"Average Balance"}
              number={accountData?.meta.average}
            />
          </HStack>
          <AccountsTable
            data={accountData?.data}
            setSortMethod={setSortMethod}
            setReloading={setReloading}
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

export default Accounts;
