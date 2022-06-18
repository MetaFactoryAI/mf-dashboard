/* eslint-disable prettier/prettier */
import { NftData } from "@/hooks/useNftMetadata";
import { Flex, VStack, Spacer, Text } from "@chakra-ui/react";
import React from "react";
// import Button from "@/components/atoms/Button"

const Files: React.FC<{nftData: NftData}> = ({ nftData }) => {
  const handleDownload = () => {
    // TODO: needs backend func - https://stackoverflow.com/questions/50694881/how-to-download-file-in-react-js
  };

  return (
    <Flex flex="1" flexDirection="row" border="0px" padding="5px" pb="47px">
      <VStack p="5px" alignItems="start">
        { nftData.files.map((file) => (
          <Text key={file.uri} fontFamily="caption" fontSize="12px" fontWeight="400px" lineHeight="15px" textDecoration="underline">
            <a href={file.uri}>{file.mimeType}</a>
          </Text>
        ))}
      </VStack>
      <Spacer />
      {/* <Box p="5px" pr="10px">
        <Button
          handleClickCallback={handleDownload}
          height="35px"
          width="121px"
          title="DOWNLOAD ALL"
        />
      </Box> */}
    </Flex>
  )
};

export default Files;
