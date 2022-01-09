import type { NextPage } from "next";
import React from "react";
import { useWeb3Context } from "@/contexts/Web3Context";
import Connect from "./Connect";
import Connected from "./Connected";

const Profile: NextPage = () => {
  const { account } = useWeb3Context();

  return (
    <div>
      {!account && <Connect />}
      {!!account && <Connected />}
    </div>
  );
};

export default Profile;
