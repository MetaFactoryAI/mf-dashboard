/* eslint-disable prettier/prettier */
import React from "react";
import { VStack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button"
import useUserName from "@/hooks/useUserName";
import { NftClaim } from "@/hooks/useMetafactoryData";
import { Alert, Loading } from "@/components/atoms";
import { getRinkebySdk } from '@dethcrypto/eth-sdk-client';
import { useSigner, useAccount, useConnect } from 'wagmi';


const ClaimWearables: React.FC<{nftClaims: NftClaim}> = ({ nftClaims }) => {
  const router = useRouter();
  const toast = useToast();
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const userName = useUserName();
  const { data: signer, isLoading } = useSigner();
  const { data: account } = useAccount();
  const { isConnected } = useConnect();
  const handleClick = () => {
    setIsAlertOpen(true);
  };
  const executeClaim = async () => {
    if(signer) {
      const sdk = getRinkebySdk(signer);
      const claim = {
        to: nftClaims.to,
        erc1155: nftClaims.erc1155,
        erc721: nftClaims.erc721,
        erc20: nftClaims.erc20,
        salt: nftClaims.salt
      }
      sdk.nft_giveaway.claimMultipleTokens(
        '0xf44766e498151e51130c5b6eb2dd3736efaccea0517e02befea776dab8dac14d',
        claim,
        nftClaims.proof
      ).then(() => {
        router.push('/closet_claim_success');
      })
      .catch((error) =>
        toast({
          title: error.reason,
          status: "error",
          isClosable: true,
        })
      );
    }
  };

  if (!isConnected || isLoading || !signer || !account?.address) return <Loading />;

  return (
    <VStack spacing="0px">
      <Alert
        isOpen={isAlertOpen}
        setIsOpen={setIsAlertOpen}
        message='Are you sure to claim?'
        title="Claim Wearables"
        confirmCallback={executeClaim}
      />
      <VStack mb="34px" mt="26px" lineHeight="16px">
        <Text fontFamily="accent" fontSize="17px" fontWeight="400">
          Welcome {userName}
        </Text>
        <Text fontFamily="caption" fontSize="12px" fontWeight="400" pb="10px">
          You have {nftClaims.erc1155[0].ids.length} items available to claim
        </Text>
        <Button
          handleClickCallback={handleClick}
          height="40px"
          width="141px"
          backgroundColor="yellow"
          title="CLAIM"
        />
      </VStack>
    </VStack>
    );
};

export default ClaimWearables;
