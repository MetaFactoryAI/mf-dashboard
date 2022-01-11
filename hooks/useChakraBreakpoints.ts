import { useBreakpointValue } from "@chakra-ui/react";

const useChakraBreakpoints = () => {
  const BIG_SCREEN = "bigScreen";
  const currentScreenSize = useBreakpointValue({
    base: "smallScreen",
    sm: "smallScreen",
    md: BIG_SCREEN,
    lg: BIG_SCREEN,
  });
  const isDesktopScreen = currentScreenSize === BIG_SCREEN;

  return { isDesktopScreen };
};

export default useChakraBreakpoints;
