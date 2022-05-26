/* eslint-disable prettier/prettier */
import React from "react";
import { VStack, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

const ListItem: React.FC<{
  assetUrl: string;
  title1: string;
  title2: string;
  redirectPath: string;
}> = ({ assetUrl, title1, title2, redirectPath, ...props }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(redirectPath)
  };

  return (
    <VStack  spacing="0px" cursor="pointer">
      <Box p="1px" textAlign="center">
        <Image
          src={assetUrl}
          alt=""
          width="163px"
          height="163px"
          onClick={handleClick}
          {...props}
        />
        <Text fontFamily="heading" fontWeight="700" fontSize="12px">
          {title1}
        </Text>
        <Text fontFamily="caption" fontWeight="400" fontSize="10px">
          {title2}
        </Text>
      </Box>
    </VStack>
  );
}
export default ListItem;
