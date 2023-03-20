import React, {ReactNode} from 'react';
import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList, Image, useColorMode,
} from '@chakra-ui/react';
import {
    FiHome,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import {IconType} from 'react-icons';
import {ReactText} from 'react';
import chakraTheme from "../ChakraTheme";
import {ChakraProvider} from '@chakra-ui/react';
import {MdAccountBalance} from 'react-icons/md';
import {GiPayMoney, GiReceiveMoney, GiTakeMyMoney} from 'react-icons/gi';
import {useNavigate} from "react-router-dom";


interface LinkItemProps {
    name: string;
    icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
    {name: 'Home', icon: FiHome},
    {name: 'Accounts', icon: MdAccountBalance},
    {name: 'Budgets', icon: GiTakeMyMoney},
    {name: 'Incomes', icon: GiReceiveMoney},
    {name: 'Expenses', icon: GiPayMoney},
    {name: 'Settings', icon: FiSettings},

];

export default function SidebarWithHeader({children,}: { children: ReactNode; }) {
    const {isOpen, onOpen, onClose} = useDisclosure();
    return (
        <ChakraProvider theme={chakraTheme}>
            <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
                <SidebarContent
                    onClose={() => onClose}
                    display={{base: 'none', md: 'block'}}
                />
                <Drawer
                    autoFocus={false}
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                    onOverlayClick={onClose}
                    size="full">
                    <DrawerContent>
                        <SidebarContent onClose={onClose}/>
                    </DrawerContent>
                </Drawer>
                <MobileNav onOpen={onOpen}/>
                <Box ml={{base: 0, md: 60}} p="4">
                    {children}
                </Box>
            </Box>
        </ChakraProvider>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
    return (
        <ChakraProvider theme={chakraTheme}>
            <Box
                transition="3s ease"
                bg={useColorModeValue('white', 'gray.900')}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                w={{base: 'full', md: 60}}
                pos="fixed"
                h="full"
                {...rest}>
                <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                    <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                        <Image src="/logo.svg" alt="Budget Bolt" boxSize={"250px"}/>
                    </Text>
                    <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
                </Flex>
                {LinkItems.map((link) => (
                    <NavItem key={link.name} icon={link.icon}>
                        {link.name}
                    </NavItem>
                ))}
            </Box>
        </ChakraProvider>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}

const NavItem = ({icon, children, ...rest}: NavItemProps) => {
    return (
        <ChakraProvider theme={chakraTheme}>
            <Link href="#" style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: 'brand.100',
                        color: 'white',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: 'white',
                            }}
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Link>
        </ChakraProvider>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

const MobileNav = ({onOpen, ...rest}: MobileProps) => {
    const navigate = useNavigate();
    const {colorMode, toggleColorMode} = useColorMode();

    const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem('token');
        navigate('/login')
    };

    console.log(localStorage.getItem('token'))


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
                    <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="open menu"
                        icon={<FiBell/>}
                    />
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
                                <MenuItem>Settings</MenuItem>
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