// function fetchData() {
//     const jwt = Cookies.get('jwt');
//     if (jwt) {
//         const headers: AxiosRequestConfig['headers'] = { Authorization: `Bearer ${jwt}` };
//         axios.get('http://localhost:8080/api/v1/', { headers })
//             .then(response => {
//                 // handle successful response
//             })
//             .catch(error => {
//                 // handle error
//             });
//     } else {
//         // handle missing JWT token
//     }
// }

import {Box, Center, Divider, Heading, VStack,} from "@chakra-ui/react";
import React from "react";
import {SettingsCard} from "../setting/SettingsCard";

function Settings() {
  return (
    <Center>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        backgroundColor="white"
        p="4"
        boxShadow="lg"
        overflowY="auto"
        width={450}
      >
        <VStack spacing="24px" align="center">
          <Heading as="h2" size="md">
            Settings
          </Heading>
          <Divider />
          <SettingsCard />
        </VStack>
      </Box>
    </Center>
  );
}

export default Settings;
