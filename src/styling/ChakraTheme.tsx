import {extendTheme} from "@chakra-ui/react";

const chakraTheme = extendTheme({
  components: {
    parts: ["field", "icon"],
    baseStyle: {
      field: {
        color: "red.400",
      },
      icon: {
        width: "2rem",
        fontSize: "3rem",
      },
    },
  },
  colors: {
    brand: {
      100: "#31C48D",
      200: "#269f75",
      900: "#1a202c",
    },
  },
});

export default chakraTheme;

// new 31C48D
// old 33b065
// old dark 1f5514
