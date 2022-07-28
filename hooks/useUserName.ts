import { useState, useEffect } from "react";
import { useAccount, useEnsName } from "wagmi";
import { formatAddress } from "@/utils/presentationHelper";

const useUserName = () => {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const currentName = ensName ?? formatAddress(account?.address);
    setUserName(currentName);
  }, [account?.address, ensName]);

  return userName;
};

export default useUserName;
