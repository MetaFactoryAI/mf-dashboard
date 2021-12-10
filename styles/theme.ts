import { extendTheme, theme } from "@chakra-ui/react";

const customTheme = extendTheme({
  ...theme,
  fonts: {
    heading: "'188 Sans-Pixel 100'",
    body: "'188 Sans-Pixel 100'",
    body_bold: "'188 Sans-Black Extended'",
    body_regular: "'188 Sans-Regular'",
  },
  colors: {
    brand: {
      100: "blue",
      900: "#1a202c",
    },
  },
});

export default customTheme;
