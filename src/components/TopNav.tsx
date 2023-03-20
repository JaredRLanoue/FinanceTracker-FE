import React, {ReactNode} from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Image
} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from '@chakra-ui/icons';
import {ChakraProvider} from '@chakra-ui/react'
import chakraTheme from "../ChakraTheme";
import {useNavigate} from "react-router-dom";

const NavLink = ({children}: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export default function TopNav() {
    const navigate = useNavigate();
    const {colorMode, toggleColorMode} = useColorMode();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem('token');
        navigate('/login')
    };

    console.log(localStorage.getItem('token'))


    return (
        <ChakraProvider theme={chakraTheme}>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box>
                        <Image src="/logo.svg" alt="Budget Bolt" boxSize={"150px"}/>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={''}
                                    />
                                </MenuButton>
                                <MenuList alignItems={'center'}>
                                    <br/>
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={''}
                                        />
                                    </Center>
                                    <br/>
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br/>
                                    <MenuDivider/>
                                    <MenuItem>Profile Settings</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}