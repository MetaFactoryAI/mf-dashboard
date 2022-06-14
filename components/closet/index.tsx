/* eslint-disable prettier/prettier */
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { VStack, HStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useSigner, useAccount, useConnect } from 'wagmi';
import { getRinkebySdk } from '@dethcrypto/eth-sdk-client';
import { ethers } from "ethers";
import { Loading } from "@/components/atoms";
import useNftMetadata, { NftItem } from "@/hooks/useNftMetadata";
import { AUTH_TOKEN_KEY } from "@/utils/constants";
import useMetafactoryData from "@/hooks/useMetafactoryData";
import ClaimWearables from "./ClaimWearables";
import ListItems from "./ListItems";


const Wearables: NextPage = () => {
  const { getNftIds, nfts, fetchNfts, loading } = useNftMetadata();
  const [isClaimable, _setIsClaimable] = useState<boolean>(true);
  const [items, setItems] = useState<NftItem[]>([]);
  const { data: signer, isLoading } = useSigner();
  const { data: account } = useAccount();
  const { isConnected } = useConnect();
  const {
    loadingNftClaims,
    nftClaims,
    fetchNftClaims,
  } = useMetafactoryData();

  const authBearer = Cookies.get(AUTH_TOKEN_KEY);

  useEffect(() => {
    if (authBearer) {
      fetchNftClaims(authBearer);
    }
  }, [authBearer, fetchNftClaims]);

  useEffect(() => {
    const fetch = async () => {
      const nftIds = getNftIds();

      if(isConnected && signer && account?.address && nftIds.length > 0 && nfts) {
        const sdk = getRinkebySdk(signer);
        const addressess = Array(nftIds.length).fill('0x8F942ECED007bD3976927B7958B50Df126FEeCb5')
        const nftBalances = await sdk.nft_wearables.balanceOfBatch(addressess, nftIds);
        const parsedBalances = nftBalances.map((balance) => ethers.utils.formatUnits(balance, 0))

        // reduce to nft items only with non-zero balance
        const nonZeroItems = parsedBalances.reduce(
          (sum: NftItem[], currentValue, currentIndex) => {
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
  }, [signer, account, isLoading, isConnected, getNftIds, nfts]);

  useEffect(() => {
    fetchNfts();
  }, [fetchNfts]);

  if (loading || isLoading || loadingNftClaims) return <Loading />;

  return (
    <VStack spacing="0px">
      {isClaimable && <ClaimWearables />}
      {!isClaimable && (
        <HStack spacing="0px" alignSelf="start"  mb="15px" alignItems="baseline" >
          <Text fontFamily="heading" letterSpacing="-0.02em" lineHeight="35px" fontWeight="700" fontSize="29px" mx="15px" paddingBottom="0px">
            Closet
          </Text>
          <Text fontFamily="caption" fontSize="14px" fontWeight="400" textAlign="end">
            {items.length} ITEMS
          </Text>
        </HStack>
      )}
      <ListItems items={items}/>
    </VStack>
    );
};

export default Wearables;
