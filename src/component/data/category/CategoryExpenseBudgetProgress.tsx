import {Box, Flex, Heading, Progress, Text} from "@chakra-ui/react";
import React from "react";
import {ExpenseCategoriesProp} from "../../../common/Types";
import {WarningTwoIcon} from "@chakra-ui/icons";

// add all category totals together, and all monthly budgets. then make a Overall Budget bar at the bottom

export const BudgetProgressBars: React.FC<ExpenseCategoriesProp> = ({
  categories,
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      p="4"
      boxShadow="lg"
      width="50%"
      height="450"
      margin="auto auto 24px auto"
      overflowY="auto"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Heading as="h2" size="md" mb="4">
          Monthly Budgets
        </Heading>
      </Flex>
      {categories.length > 0 ? (
        categories.map(({ category, total, budget }, index) => (
          <Flex key={category} alignItems="center" mb="3.5">
            <Box>
              <Text fontWeight="bold" width="185px">
                {category}
              </Text>
              <Text>
                {"$" + total.toLocaleString()} / {"$" + budget.toLocaleString()} {total > budget && <WarningTwoIcon color={"red"} mb={1}/>}
              </Text>
            </Box>
            <Box flex="1" position="relative">
              <Text
                position="absolute"
                left="0"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
                ml="2"
                fontSize="sm"
                color="white"
                textShadow="0 0 2px black"
                fontWeight="bold"
              >
                {budget === 0 ? "0%" : `${Math.round((total / budget) * 100)}%`}
              </Text>
              {budget !== 0 && (
                <Progress
                  value={Math.min((total / budget) * 100, 100)}
                  colorScheme={
                    total / budget >= 1
                      ? "red"
                      : total / budget >= 0.75
                      ? "yellow"
                      : "green"
                  }
                  borderRadius="10px"
                  height="20px"
                  className="progress-bar"
                />
              )}
            </Box>
          </Flex>
        ))
      ) : (
        <Box alignItems="center" height={350} textAlign="center">
          No budgets available for display... add some expenses and categories!
          💵
        </Box>
      )}
    </Box>
  );
};
