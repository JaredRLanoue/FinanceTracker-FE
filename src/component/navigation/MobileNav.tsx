import {useNavigate} from "react-router-dom";
import {
    Avatar,
    Box,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
    useColorMode,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {FiChevronDown, FiMenu} from "react-icons/fi";
import axios, {AxiosRequestConfig} from "axios";
import {MobileProps, User} from "../../common/Types";

export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const jwt = localStorage.getItem("token");
  const [data, setData] = useState<User>();

  useEffect(() => {
    if (jwt) {
      const headers: AxiosRequestConfig["headers"] = {
        Authorization: `Bearer ${jwt}`,
      };
      axios
        .get("http://localhost:8080/api/v1/auth/user/find", { headers })
        .then((response) => {
          setData(response.data as User);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("NO JWT");
    }
  }, [jwt]);

  function titleCase(input: string) {
    return input[0].toUpperCase() + input.substr(1).toLowerCase();
  }

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/settings");
  };

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <HStack spacing={{ base: "0", md: "6" }}>
        {/*<IconButton*/}
        {/*    size="lg"*/}
        {/*    variant="ghost"*/}
        {/*    aria-label="open menu"*/}
        {/*    icon={<FiBell/>}*/}
        {/*/>*/}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={""} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  {data && (
                    <>
                      <Text fontSize="sm">
                        {titleCase(data.first_name) +
                          " " +
                          titleCase(data.last_name)}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {titleCase(data.role)}
                      </Text>
                    </>
                  )}
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleSettings}>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
