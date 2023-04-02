import {useNavigate} from "react-router-dom";
import {
    Avatar, Box,
    ChakraProvider,
    Flex, FlexProps,
    HStack,
    IconButton,
    Menu,
    MenuButton, MenuDivider, MenuItem, MenuList, Text,
    useColorMode,
    useColorModeValue, VStack
} from "@chakra-ui/react";
import React from "react";
import chakraTheme from "../../ChakraTheme";
import {FiChevronDown, FiMenu} from "react-icons/fi";

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

export const MobileNav = ({onOpen, ...rest}: MobileProps) => {
    // const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const {colorMode, toggleColorMode} = useColorMode();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem('token');
        navigate('/login')
    };

    const handleSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/settings')
    };

    return (
        <ChakraProvider theme={chakraTheme}>
            <Flex
                ml={{base: 0, md: 60}}
                px={{base: 4, md: 4}}
                height="20"
                alignItems="center"
                bg={useColorModeValue('white', 'gray.900')}
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
                justifyContent={{base: 'space-between', md: 'flex-end'}}
                {...rest}>
                <IconButton
                    display={{base: 'flex', md: 'none'}}
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<FiMenu/>}
                />
                <HStack spacing={{base: '0', md: '6'}}>
                    {/*<IconButton*/}
                    {/*    size="lg"*/}
                    {/*    variant="ghost"*/}
                    {/*    aria-label="open menu"*/}
                    {/*    icon={<FiBell/>}*/}
                    {/*/>*/}
                    <Flex alignItems={'center'}>
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{boxShadow: 'none'}}>
                                <HStack>
                                    <Avatar
                                        size={'sm'}
                                        src={''}
                                    />
                                    <VStack
                                        display={{base: 'none', md: 'flex'}}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2">
                                        <Text fontSize="sm">User</Text>
                                    </VStack>
                                    <Box display={{base: 'none', md: 'flex'}}>
                                        <FiChevronDown/>
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue('white', 'gray.900')}
                                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                                <MenuItem onClick={handleSettings}>Settings</MenuItem>
                                <MenuDivider/>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Flex>
        </ChakraProvider>
    );
};