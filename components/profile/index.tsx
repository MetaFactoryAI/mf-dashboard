import React, { useEffect } from "react";
import type { NextPage } from "next";
import { useToast } from "@chakra-ui/react";
import { useWeb3Context } from "@/contexts/Web3Context";
import Connect from "./Connect";
import Connected from "./Connected";

const Profile: NextPage = () => {
  const { account, loading, isValidChain } = useWeb3Context();
  const selectEthToastId = "select_eth_toast_id";
  const toast = useToast();

  useEffect(() => {
    if (!loading && !!account && !isValidChain() && !toast.isActive(selectEthToastId)) {
      toast({
        id: selectEthToastId,
        title: "Please select Ethereum mainnet network",
        status: "error",
        isClosable: true,
      });
    }
  }, [isValidChain, toast, loading, account]);

  return (
    <>
      {!loading && (!account || !isValidChain()) && <Connect />}
      {!loading && !!account && isValidChain() && <Connected />}
    </>
  );
};

export default Profile;
