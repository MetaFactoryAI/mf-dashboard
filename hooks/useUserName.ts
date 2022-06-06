import { useMemo } from "react";
import { useAccount, useEnsName } from "wagmi";
import { formatAddress } from "@/utils/presentationHelper";

const useUserName = () => {
  const { data: account } = useAccount();
  const { data: ensName } = useEnsName({ address: account?.address });

  const userName = useMemo(
    () => ensName ?? formatAddress(account?.address),
    [account?.address, ensName],
  );

  return userName;
};

export default useUserName;
