import { nanoid } from "nanoid";

type Claim = {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  tid: string;
};
const MESSAGE = "Please sign this message with your wallet to authenticate.\n\n";
const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

const generateSignInMessage = (address: string): string => {
  const iat = +new Date();

  const claim: Claim = {
    iat,
    exp: iat + tokenDuration,
    iss: address,
    aud: process.env.NEXT_PUBLIC_APP_NAME || "",
    tid: nanoid(),
  };

  const serializedClaim = JSON.stringify(claim);
  const signInMessage = `${MESSAGE}${serializedClaim}`;

  return signInMessage;
};

export default generateSignInMessage;
