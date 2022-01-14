import type { NextPage } from "next";
import React from "react";
import { useWeb3Context } from "@/contexts/Web3Context";
import Connect from "./Connect";
import Connected from "./Connected";

const Profile: NextPage = () => {
  const { account, loading } = useWeb3Context();

  return (
    <>
      {!loading && !account && <Connect />}
      {!loading && !!account && <Connected />}
    </>
  );
};

export default Profile;
