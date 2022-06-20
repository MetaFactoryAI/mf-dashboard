import { extendTheme, theme } from "@chakra-ui/react";

const customTheme = extendTheme({
  ...theme,
  fonts: {
    heading: "'Inter-Bold'",
    body: "'Inter-Regular'",
    caption: "'CoFo_Rax_V0.1'",
    accent: "'RuneScape UF'",
    body_bold: "'188 Sans-Black Extended'",
    body_regular: "'188 Sans-Regular'",
  },
  colors: {
    background: "#8E8F8A",
    yellow: "#C8E400",
    brand: {
      100: "blue",
      900: "#1a202c",
    },
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default customTheme;
