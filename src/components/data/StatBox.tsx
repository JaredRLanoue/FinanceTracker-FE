import {Box, Stat, StatLabel, StatNumber} from "@chakra-ui/react";

interface StatBoxProps {
    label: string;
    number?: string;
}

export default function StatBox(props: StatBoxProps) {
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" backgroundColor="white" p="4" boxShadow="lg"
             margin="0 auto">
            <Stat>
                <StatLabel>{props.label}</StatLabel>
                <StatNumber>{props.number}</StatNumber>
            </Stat>
        </Box>
    );
}
