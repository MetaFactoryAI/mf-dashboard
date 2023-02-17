/* eslint-disable prettier/prettier */
import React from "react";
import { VStack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button"
import useUserName from "@/hooks/useUserName";
import { NftClaim } from "@/hooks/useMetafactoryData";
import { Alert } from "@/components/atoms";
// import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { getGoerliSdk } from '@dethcrypto/eth-sdk-client';

import { useSigner } from 'wagmi';


const ClaimWearables: React.FC<{nftClaims: NftClaim[]}> = ({ nftClaims }) => {
  const router = useRouter();
  const toast = useToast();
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const userName = useUserName();
  const { data: signer } = useSigner();
  const handleClick = () => {
    executeClaim();
  };
  const executeClaim = async () => {
    if(signer) {
      // eslint-disable-next-line camelcase
      const { nft_giveaway } = getGoerliSdk(signer);
      const claims = nftClaims.map((nftClaim: NftClaim) => ({
          to: nftClaim.claim_json.to,
          erc1155: nftClaim.claim_json.erc1155,
          erc721: nftClaim.claim_json.erc721,
          erc20: nftClaim.claim_json.erc20,
          salt: nftClaim.claim_json.salt
        }))
      const merkleRootHashes = nftClaims.map((nftClaim: NftClaim) => nftClaim.merkle_root_hash)
      const merkleProofs = nftClaims.map((nftClaim: NftClaim) => nftClaim.claim_json.proof)

      nft_giveaway.claimMultipleTokensFromMultipleMerkleTree(
        merkleRootHashes,
        claims,
        merkleProofs
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
          You have { nftClaims.reduce((sum: number, nftClaim: NftClaim) => sum + nftClaim.claim_json.claim_count, 0) } items available to claim
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
