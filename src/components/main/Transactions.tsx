import {ChakraProvider} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import axios, {AxiosRequestConfig} from 'axios';
import SidebarWithHeader from "../navigation/NavBarWithHeader";

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

function Transactions() {
    return (
        <SidebarWithHeader>
            <ChakraProvider>
                Transaction Page
            </ChakraProvider>
        </SidebarWithHeader>
    );
}

export default Transactions;