/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { VStack, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useAccount, useProvider } from 'wagmi';
import { getGoerliSdk } from '@dethcrypto/eth-sdk-client';
// import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { ethers } from "ethers";
import { Loading } from "@/components/atoms";
import useNftMetadata, { NftItem } from "@/hooks/useNftMetadata";
import useMetafactoryData, { NftClaim } from "@/hooks/useMetafactoryData";
import ClaimWearables from "./ClaimWearables";
import ListItems from "./ListItems";


const Wearables: NextPage = () => {
  const { getNftIds, nfts, fetchNfts, loading } = useNftMetadata();
  const [items, setItems] = useState<NftItem[]>([]);
  const [isAllClaimed, setIsAllClaimed] = useState<boolean>(true);
  const [unclaimedNftClaims, setUnclaimedNftClaims] = useState<NftClaim[]>([]);
  const { data: account } = useAccount();
  const authBearer = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "");
  const provider = useProvider();

  const {
    loadingNftClaims,
    nftClaims,
    fetchNftClaims,
  } = useMetafactoryData();

  useEffect(() => {
    const findClaimableClaims = async (currentProvider: ethers.providers.Provider, address: string, rootHashes: string[], allNftClaims: NftClaim[]) => {
      const { nft_giveaway } = getGoerliSdk(provider);
      const claimedStatuses = await nft_giveaway.getClaimedStatus(address, rootHashes);
      const currentUnclaimedNftClaims = claimedStatuses.reduce(
        (sum: NftClaim[], currentValue: boolean, currentIndex: number) => {
          if(currentValue === true) return sum;

          const unclaimedRootHash = rootHashes[currentIndex];
          const unclaimedNftClaim = allNftClaims.find((claim: NftClaim) => claim.merkle_root_hash === unclaimedRootHash)

          if(unclaimedNftClaim) sum.push(unclaimedNftClaim);

          return sum;
        },
        []
      );
      const areAnyUnclaimed = currentUnclaimedNftClaims.length > 0

      setUnclaimedNftClaims(currentUnclaimedNftClaims);
      setIsAllClaimed(!areAnyUnclaimed);
    };

    if(provider && account?.address && nftClaims && nftClaims?.length > 0) {
      const merkleRootHashes = nftClaims.map((nftClaim: NftClaim) => nftClaim.merkle_root_hash)
      findClaimableClaims(provider, account?.address, merkleRootHashes, nftClaims);
    }
  }, [account?.address, nftClaims, provider]);

  useEffect(() => {
    if (authBearer && account?.address) {
      fetchNftClaims(authBearer, account?.address);
    }
  }, [account?.address, authBearer, fetchNftClaims]);

  useEffect(() => {
    const fetch = async () => {
      const nftIds = getNftIds();

      if(provider && account?.address && nftIds.length > 0 && nfts) {
        const { nft_wearables } = getGoerliSdk(provider);
        const addressess = Array(nftIds.length).fill(account?.address)
        const nftBalances = await nft_wearables.balanceOfBatch(addressess, nftIds);
        const parsedBalances = nftBalances.map((balance: ethers.BigNumberish) => ethers.utils.formatUnits(balance, 0))

        // reduce to nft items only with existing balance
        const existingItems = parsedBalances.reduce(
          (sum: NftItem[], currentValue: string, currentIndex: number) => {
            if(currentValue === '0') return sum;

            const nftId = nftIds[currentIndex];
            const currentItem = nfts[nftId];
            sum.push(currentItem);

            return sum;
          },
          []
        );

        setItems(existingItems)
      };
    }

    fetch();
  }, [provider, account, getNftIds, nfts]);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts]);

  if (loading || loadingNftClaims) return <Loading />;

  return (
    <VStack spacing="0px">
      {nftClaims && !isAllClaimed && <ClaimWearables nftClaims={unclaimedNftClaims} />}
        <HStack spacing="0px" alignSelf="start"  mb="15px" alignItems="baseline" >
          <Text fontFamily="heading" letterSpacing="-0.02em" lineHeight="35px" fontWeight="700" fontSize="29px" mx="15px" paddingBottom="0px">
            Closet
          </Text>
          <Text fontFamily="caption" fontSize="14px" fontWeight="400" textAlign="end">
            {items.length} ITEMS
          </Text>
        </HStack>
      <ListItems items={items}/>
    </VStack>
    );
};

export default Wearables;
