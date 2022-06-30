/* eslint-disable prettier/prettier */
import type { NextPage } from "next";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDisconnect } from 'wagmi'
import { useRouter } from "next/router";

const Connect: NextPage = () => {
  const { disconnect } = useDisconnect()
  const router = useRouter();

  useEffect(() => {
    Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "");
    disconnect();
    router.push('/');

  }, [disconnect, router]);

  return (<></>);
};

export default Connect;
