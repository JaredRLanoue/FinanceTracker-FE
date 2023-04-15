import {
  Box,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { StatBoxProps } from "../../../common/Types";

export default function StatBox(props: StatBoxProps) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      backgroundColor="white"
      p="4"
      // width="35%"
      boxShadow="lg"
      margin="0 auto"
    >
      <Stat>
        <StatLabel>{props.label}</StatLabel>
        <StatNumber>{props.number}</StatNumber>
        {/*<StatHelpText>*/}
        {/*    <StatArrow type='increase' />*/}
        {/*    23.36%*/}
        {/*</StatHelpText>*/}
      </Stat>
    </Box>
  );
}
