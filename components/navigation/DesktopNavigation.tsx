import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Flex, Spacer, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useUserName from "@/hooks/useUserName";
import { isSelected } from "@/utils/navigation";

// menu items naming need to fit with beginning of route names
const DesktopNavigation: React.FC = () => {
  const router = useRouter();
  const userName = useUserName();
  const LOGO_MARGIN = 7;

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      height={`${process.env.NEXT_PUBLIC_LOGO_HEIGHT}px`}
      fontSize="18px"
    >
      <Box ml={`${LOGO_MARGIN}px`} mt={`${LOGO_MARGIN}px`}>
        <a href="https://www.metafactory.ai/" target="_blank" rel="noopener noreferrer">
          <Image
            src="/header-logo-short.svg"
            alt=""
            width={`${Number(process.env.NEXT_PUBLIC_LOGO_HEIGHT) - LOGO_MARGIN * 2}px`}
            height={`${Number(process.env.NEXT_PUBLIC_LOGO_HEIGHT) - LOGO_MARGIN * 2}px`}
          />
        </a>
      </Box>
      <Flex p="4">
        <Box px="2" bg={isSelected("/project", router.asPath) ? "yellow" : ""}>
          <a target="_blank" href="https://www.metafactory.ai" rel="noopener noreferrer">
            Home
          </a>
        </Box>
        {/* <Box px="2" bg={isSelected("/robot", router.asPath) ? "yellow" : ""}>
          <a target="_blank" href="https://www.metafactory.ai/robots" rel="noopener noreferrer">
            $Robot
          </a>
        </Box> */}
        <Flex px="2" bg={isSelected("/shop", router.asPath) ? "yellow" : ""}>
          <Box pr="1">
            <Image src="/arrow.svg" alt="" width="10px" height="10px" />
          </Box>
          <a target="_blank" href="https://shop.metafactory.ai/" rel="noopener noreferrer">
            Shop
          </a>
        </Flex>
      </Flex>
      <Spacer />
      <Flex>
        <Box px="2" bg={isSelected("/exchange", router.asPath) ? "yellow" : ""}>
          <Link href="/exchange">Exchange</Link>
        </Box>
        {/* <Box px="2" bg={isSelected("/claim", router.asPath) ? "yellow" : ""}>
          <Link href="/claim">Claim</Link>
        </Box> */}
        <Box px="2" bg={isSelected("/", router.asPath) ? "yellow" : ""}>
          <Link href="/">Closet</Link>
        </Box>
        <Box px="2" border="1px" bg={isSelected("/profile", router.asPath) ? "yellow" : ""}>
          <Link href="/profile">{userName || "Connect"}</Link>
        </Box>
        <Box width={`${process.env.NEXT_PUBLIC_LOGO_HEIGHT}px`} />
      </Flex>
    </Flex>
  );
};

export default DesktopNavigation;
