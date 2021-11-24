import { extendTheme, theme } from "@chakra-ui/react";

const customTheme = extendTheme({
  ...theme,
  fonts: {
    heading: "'188 Sans-Pixel 70'",
    body: "'188 Sans-Pixel 70'",
  },
  colors: {
    brand: {
      100: "blue",
      900: "#1a202c",
    },
  },
});

export default customTheme;
