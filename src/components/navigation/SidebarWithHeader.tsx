import React, {ReactNode} from 'react';
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from '@chakra-ui/react';
import chakraTheme from "../../ChakraTheme";
import {ChakraProvider} from '@chakra-ui/react';
import {SidebarContent} from "./SidebarContent";
import {MobileNav} from "./MobileNav";

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