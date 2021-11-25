import { useEffect } from "react";
import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
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

  return (
    <div>
      <Button onClick={handleConnect}>Connect</Button>
    </div>
  );
};

export default Connect;
