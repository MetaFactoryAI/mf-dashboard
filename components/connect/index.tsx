/* eslint-disable prettier/prettier */
import { useEffect } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
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

  const MEX_WIDTH = 480;
  return (
    <VStack>
      <svg
        width={MEX_WIDTH}
        height="320"
        viewBox="0 0 480 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="160" width="160" height="80" fill="url(#paint0_linear_908:3377)"/>
        <rect x="240" y="239" width="80" height="80" fill="black"/>
        <rect x="321" y="160" width="80" height="80" fill="black"/>
        <rect x="80" width="80" height="80" fill="#FF2ECE"/>
        <rect y="239" width="80" height="80" fill="#FFEE36"/>
        <rect x="400" y="240" width="80" height="80" fill="black"/>
        <path d="M240 80H160V160H240V80Z" fill="black"/>
        <path d="M203.067 98.4444V135.378H196.933V98.4444H178.444V141.556H184.622V104.622H190.755V141.556H209.244V104.622H215.378V141.556H221.555V98.4444H203.067Z" fill="white"/>
        <path d="M400 0H320V80H400V0Z" fill="#FFEE36"/>
        <path d="M384 16H336V64H384V16Z" fill="black"/>
        <path d="M377.164 22.8855H342.886V43.4427H377.164V22.8855Z" fill="white"/>
        <path d="M377.164 57.1641H342.886V46.2167L377.164 50.3282V57.1641Z" fill="white"/>
        <path d="M356.607 32C356.607 33.8824 355.071 35.418 353.189 35.418C351.307 35.418 349.771 33.8824 349.771 32" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M352.281 32C352.281 32.4962 352.692 32.9081 353.189 32.9081C353.685 32.9081 354.097 32.4962 354.097 32H359.116C359.116 35.2685 356.457 37.9279 353.189 37.9279C349.92 37.9279 347.261 35.2685 347.261 32H352.281Z" fill="black"/>
        <path d="M370.328 32C370.328 33.8824 368.792 35.418 366.91 35.418C365.028 35.418 363.492 33.8824 363.492 32" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M366.002 32C366.002 32.4962 366.414 32.9081 366.91 32.9081C367.406 32.9081 367.818 32.4962 367.818 32H372.838C372.838 35.2685 370.179 37.9279 366.91 37.9279C363.642 37.9279 360.982 35.2685 360.982 32H366.002Z" fill="black"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M377.164 32.1376H342.886V28.7911H377.164V32.1376Z" fill="black"/>
        <g clipPath="url(#clip0_908:3377)">
        <line x1="1" y1="-4.37114e-08" x2="1.00001" y2="320" stroke="black" strokeWidth="2"/>
        <line x1="81" y1="-4.37114e-08" x2="81" y2="320" stroke="black" strokeWidth="2"/>
        <line x1="161" y1="-4.37114e-08" x2="161" y2="320" stroke="black" strokeWidth="2"/>
        <line x1="241" y1="-4.37114e-08" x2="241" y2="320" stroke="black" strokeWidth="2"/>
        <line x1="321" y1="-4.37114e-08" x2="321" y2="320" stroke="black" strokeWidth="2"/>
        <line x1="401" y1="-4.37114e-08" x2="401" y2="320" stroke="black" strokeWidth="2"/>
        <line y1="79" x2="480" y2="79" stroke="black" strokeWidth="2"/>
        <line y1="159" x2="480" y2="159" stroke="black" strokeWidth="2"/>
        <line y1="239" x2="480" y2="239" stroke="black" strokeWidth="2"/>
        <line y1="319" x2="480" y2="319" stroke="black" strokeWidth="2"/>
        </g>
        <rect x="1" y="1" width="478" height="318" stroke="black" strokeWidth="2"/>
        <defs>
        <linearGradient id="paint0_linear_908:3377" x1="-1.19209e-06" y1="200" x2="160" y2="200" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF2ECE"/>
        <stop offset="0.234375" stopColor="#8B2CFF"/>
        <stop offset="0.494792" stopColor="#2EEFFF"/>
        <stop offset="0.75" stopColor="#4FF970"/>
        <stop offset="1" stopColor="#FFEE36"/>
        </linearGradient>
        <clipPath id="clip0_908:3377" />
        </defs>
      </svg>

      <Text
        pb="20px"
        pt="64px"
        textAlign="center"
        width={MEX_WIDTH}
        fontSize="32px"
        fontFamily="body_bold"
        fontWeight="800"
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
