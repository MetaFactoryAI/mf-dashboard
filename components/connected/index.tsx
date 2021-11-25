import { useEffect } from "react";
import { Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useWeb3Context } from "@/contexts/Web3Context";

const Connect: NextPage = () => {
  const { loading, account, errors } = useWeb3Context();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!account || errors)) {
      router.push("/connect");
    }
  }, [account, router, loading, errors]);

  return <Center>CONNECTED</Center>;
};

export default Connect;
