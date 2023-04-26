import {Box, Button, Container, Heading, Stack, Text,} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import React from "react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
        rel="stylesheet"
      />
      <title>Budget Bolt</title>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Simplify Your Finances <br />
            <Text as={"span"} color={"brand.100"}>
              Track, Analyze, and Save
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            With our all-in-one finance tracking tool, you can easily track your
            incomes, expenses, accounts, and budgets in one place. You'll also
            have access to detailed expense graphs, so you can better understand
            your spending habits and make informed decisions.
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"brand.100"}
              onClick={() => {
                navigate("/login");
              }}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "brand.200",
              }}
            >
              Get Started
            </Button>
            <Box></Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
