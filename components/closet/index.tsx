/* eslint-disable prettier/prettier */
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { VStack, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useAccount, useProvider } from 'wagmi';
import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { ethers } from "ethers";
import { Loading } from "@/components/atoms";
import useNftMetadata, { NftItem } from "@/hooks/useNftMetadata";
import useMetafactoryData from "@/hooks/useMetafactoryData";
import ClaimWearables from "./ClaimWearables";
import ListItems from "./ListItems";


const Wearables: NextPage = () => {
  const { getNftIds, nfts, fetchNfts, loading } = useNftMetadata();
  const [items, setItems] = useState<NftItem[]>([]);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const { data: account } = useAccount();
  const authBearer = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "");
  const provider = useProvider();

  const {
    loadingNftClaims,
    nftClaims,
    fetchNftClaims,
  } = useMetafactoryData();

  useEffect(() => {
    const checkClaimable = async (currentProvider: ethers.providers.Provider, address: string, rootHash: string) => {
      const { ethereum } = getMainnetSdk(provider);
      const claimedStatuses = await ethereum.nft_giveaway.getClaimedStatus(address, [rootHash]);

      setIsClaimed(claimedStatuses[0]);
    };

    if(provider && account?.address && nftClaims) {
      checkClaimable(provider, account?.address, nftClaims.merkle_root_hash);
    }
  }, [account?.address, nftClaims, provider]);

  useEffect(() => {
    if (authBearer && account?.address) {
      fetchNftClaims(authBearer);
    }
  }, [account?.address, authBearer, fetchNftClaims]);

  useEffect(() => {
    const fetch = async () => {
      const nftIds = getNftIds();

      if(provider && account?.address && nftIds.length > 0 && nfts) {
        const { ethereum } = getMainnetSdk(provider);
        const addressess = Array(nftIds.length).fill(account?.address)
        const nftBalances = await ethereum.nft_wearables.balanceOfBatch(addressess, nftIds);
        const parsedBalances = nftBalances.map((balance: ethers.BigNumberish) => ethers.utils.formatUnits(balance, 0))

        // reduce to nft items only with non-zero balance
        const nonZeroItems = parsedBalances.reduce(
          (sum: NftItem[], currentValue: string, currentIndex: number) => {
            if(currentValue === '0') return sum;

            const nftId = nftIds[currentIndex];
            const currentItem = nfts[nftId];
            sum.push(currentItem);

            return sum;
          },
          []
        );

        setItems(nonZeroItems)
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
      {nftClaims && !isClaimed && <ClaimWearables nftClaims={nftClaims} />}
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
