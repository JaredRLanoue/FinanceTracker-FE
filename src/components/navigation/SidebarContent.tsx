import {Box, BoxProps, ChakraProvider, CloseButton, Flex, Image, Text, useColorModeValue} from "@chakra-ui/react";
import chakraTheme from "../../ChakraTheme";
import React from "react";
import {FiHome, FiSettings} from "react-icons/fi";
import {MdAccountBalance} from "react-icons/md";
import {GrTransaction} from "react-icons/gr";
import {GoTag} from "react-icons/go";
import {IconType} from "react-icons";
import {NavItem} from "./NavItem";

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

interface LinkItemProps {
    name: string;
    icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
    {name: 'Dashboard', icon: FiHome},
    {name: 'Accounts', icon: MdAccountBalance},
    {name: 'Transactions', icon: GrTransaction},
    {name: 'Categories', icon: GoTag},
    {name: 'Settings', icon: FiSettings},
];


export const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
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