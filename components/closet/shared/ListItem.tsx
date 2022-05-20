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
    <VStack  spacing="0px">
      <Box p="1px" textAlign="center">
        <Image
          src={assetUrl}
          alt=""
          width="163px"
          height="163px"
          onClick={handleClick}
          {...props}
        />
        <Text fontFamily="body_regular" fontWeight="400" fontSize="9px">
          {title1}
        </Text>
        <Text fontFamily="body_regular" fontWeight="400" fontSize="6px">
          {title2}
        </Text>
      </Box>
    </VStack>
  );
}
export default ListItem;
