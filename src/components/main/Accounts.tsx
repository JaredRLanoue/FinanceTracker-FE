import {
  ChakraProvider,
  Spinner,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import axios, { AxiosRequestConfig } from "axios";
import SidebarWithHeader from "../navigation/SidebarWithHeader";
import { useEffect, useState } from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  starting_balance: number;
  expenses: any[];
  incomes: any[];
  created_at: string;
  updated_at: string;
}

function Accounts() {
  const [data, setData] = useState<Account[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const jwt = localStorage.getItem("token");

  useEffect(() => {
    if (jwt) {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      axios
        .get("http://localhost:8080/api/v1/auth/accounts", { headers })
        .then((response) => {
          if (response.data.length > 0) {
            setData(response.data);
          } else {
            console.log("Empty");
          }
          // setLoading(false);
        })
        .catch((error) => {
          // show error that connection to server has been lost
          console.log(error);
          // setLoading(false);
        });
    } else {
      console.log("NO JWT");
      // setLoading(false);
    }
  }, [jwt]);

  // if (loading) {
  //     return <div>Loading...</div>;
  // }

  return (
    <SidebarWithHeader>
      {data.length > 0 ? (
        <Stack direction={["column", "row"]} spacing="24px">
          {data.map((account) => (
            <div key={account.id}>
              <Box
                h="100px"
                w="200px"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                backgroundColor="white"
                p="4"
                boxShadow="lg"
              >
                <Stat>
                  <StatLabel>{account.name}</StatLabel>
                  <StatNumber>${account.balance}</StatNumber>
                  <StatHelpText>{account.type}</StatHelpText>
                </Stat>
              </Box>
            </div>
          ))}
        </Stack>
      ) : (
        <Spinner />
      )}
    </SidebarWithHeader>
  );
}

export default Accounts;
