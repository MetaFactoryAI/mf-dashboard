/* eslint-disable prettier/prettier */
import { Flex, VStack, Spacer, Text, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Button from "@/components/atoms/Button"

const Files: NextPage = () => {
  const handleDownload = () => {
    // TODO: needs backend func - https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  };

  return (
    <Flex flex="1" flexDirection="row" border="0px" padding="5px" pb="47px">
      <VStack p="5px" alignItems="start">
        <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px" textDecoration="underline">
          <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/tshirt_tpose.glb">1. MUTANTV2.GLTF</a>
        </Text>
        <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px" textDecoration="underline">
          <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/tshirt_tpose.glb">2. MUTANTV2.GLB</a>
        </Text>
        <Text fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px" textDecoration="underline">
          <a href="https://raw.githubusercontent.com/MetaFactoryAI/mf-wearables/main/bankless_tshirt/bankless-shirt.png">3. MUTANTV2.PNG</a>
        </Text>
      </VStack>
      <Spacer />
      <Box p="5px" pr="10px">
        <Button
          handleClickCallback={handleDownload}
          height="35px"
          width="121px"
          title="DOWNLOAD ALL"
        />
      </Box>
    </Flex>
  )
};

export default Files;
