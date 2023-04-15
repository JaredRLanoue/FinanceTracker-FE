import {Box, Stat, StatLabel, StatNumber,} from "@chakra-ui/react";
import {StatBoxProps} from "../../../common/Types";
import {useEffect, useState} from "react";

export default function StatBox(props: StatBoxProps) {
  const [displayedNumber, setDisplayedNumber] = useState(0);

  useEffect(() => {
    let startTime: number;

    const animationFrame = (currentTime: number) => {
      if (startTime === undefined) {
        startTime = currentTime;
      }

      const elapsedTime = currentTime - startTime;

      if (elapsedTime >= 500) {
        setDisplayedNumber(props.number);
      } else {
        const t = elapsedTime / 500;
        const easedT = cubicEaseInOut(t);
        setDisplayedNumber(
            Math.round(
                displayedNumber + (props.number - displayedNumber) * easedT
            )
        );
        requestAnimationFrame(animationFrame);
      }
    };

    requestAnimationFrame(animationFrame);

    return () => {
      setDisplayedNumber(0);
    };
  }, [props.number]);

  function cubicEaseInOut(t: number) {
    if (t <= 0) {
      return 0;
    } else if (t >= 1) {
      return 1;
    } else if (t < 0.5) {
      return 4 * t * t * t;
    } else {
      const f = 2 * t - 2;
      return 0.5 * f * f * f + 1;
    }
  }

  return (
      <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          backgroundColor="white"
          p="4"
          boxShadow="lg"
          margin="0 auto"
      >
        <Stat>
          <StatLabel>{props.label}</StatLabel>
          <StatNumber>{"$" + displayedNumber.toLocaleString()}</StatNumber>
        </Stat>
      </Box>
  );
}
