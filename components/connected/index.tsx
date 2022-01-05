import { useEffect } from "react";
import { Center, Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
// eslint-disable-next-line camelcase
import { MerkleRedeem__factory } from "types/ethers-contracts";
import { ethers } from "ethers";
import { useWeb3Context } from "@/contexts/Web3Context";
import { loadTree } from "@/utils/merkle/merkleTree";
import { MERKLE_REDEEM_CONTRACT } from "@/utils/constants";

const Connect: NextPage = () => {
  const { loading, account, errors, provider } = useWeb3Context();
  const router = useRouter();
  const handleClaim = async () => {
    if (provider && account) {
      const testBalances = {
        "0x8aBa14b229b1C4647FBF897b99b3a36E9BDF5422": "1.0",
        "0x77c845E6A61F37cB7B237de90a74fbc3679FcF06": "2.0",
      };

      const redeem = MerkleRedeem__factory.connect(MERKLE_REDEEM_CONTRACT, provider.getSigner());
      const merkleTree = loadTree(testBalances);
      const merkleProof = merkleTree.getHexProof(
        ethers.utils.solidityKeccak256(
          ["address", "uint256"],
          [account, ethers.utils.parseEther("1")],
        ),
      );
      await redeem.claimWeek(account, 4, ethers.utils.parseEther("1"), merkleProof);
    }
  };

  useEffect(() => {
    if (!loading && (!account || errors)) {
      router.push("/connect");
    }
  }, [account, router, loading, errors]);

  return (
    <Center>
      CONNECTED
      <Button
        onClick={handleClaim}
        backgroundColor="transparent"
        border="1px"
        rounded="false"
        _hover={{ bg: "transparent" }}
      >
        Claim balance
      </Button>
    </Center>
  );
};

export default Connect;
