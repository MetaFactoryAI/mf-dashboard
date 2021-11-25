import { useEffect } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useWeb3Context } from "@/contexts/Web3Context";

const Connect: NextPage = () => {
  const { loading, account, connectWeb3, errors } = useWeb3Context();
  const router = useRouter();
  const handleConnect = () => {
    if (!account) {
      connectWeb3();
      router.push("/connected");
    }
  };

  useEffect(() => {
    if (!loading && !errors && account) {
      router.push("/connected");
    }
  }, [account, errors, loading, router]);

  const MEX_WIDTH = 480;
  return (
    <VStack>
      <Image src="/not-connected-frame.svg" alt="" width={MEX_WIDTH} height="320" />
      <Text
        pb="20px"
        pt="64px"
        textAlign="center"
        width={MEX_WIDTH}
        fontSize="32px"
        fontFamily="body2"
      >
        Please connect your wallet to continue
      </Text>
      <Button
        onClick={handleConnect}
        backgroundColor="transparent"
        border="1px"
        rounded="false"
        _hover={{ bg: "transparent" }}
        width={MEX_WIDTH}
      >
        Connect
      </Button>
    </VStack>
  );
};

export default Connect;
