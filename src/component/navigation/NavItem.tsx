import {useNavigate} from "react-router-dom";
import React from "react";
import {Box, Flex, Icon, Link} from "@chakra-ui/react";
import {MdKeyboardArrowRight} from "react-icons/all";
import {NavItemProps} from "../../common/Types";

export const NavItem = ({
  icon,
  children,
  isActive,
  ...rest
}: NavItemProps) => {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigate("/" + children.toString().toLowerCase());
  };

  return (
    <Link
      onClick={handleClick}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "brand.100",
          color: "white",
        }}
        {...rest}
      >
        {isActive && (
          <Box
            as={MdKeyboardArrowRight}
            boxSize={5}
            mr={2}
            display={{ base: "none", md: "block" }}
          />
        )}
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
