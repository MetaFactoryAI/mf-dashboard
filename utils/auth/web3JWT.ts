import type { Web3Provider } from "@ethersproject/providers";
import { Base64 } from "js-base64";
import { nanoid } from "nanoid";

import requestSignature from "./signature";

const tokenDuration = 1000 * 60 * 60 * 24 * 7; // 7 days

type Claim = {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  tid: string;
};

const MESSAGE = "Please sign this message with your wallet to authenticate.\n\n";

export default async function createToken(
  provider: Web3Provider,
  appName: string,
): Promise<string> {
  const signer = provider.getSigner();
  const address = await signer.getAddress();

  const iat = +new Date();

  const claim: Claim = {
    iat,
    exp: iat + tokenDuration,
    iss: address,
    aud: appName,
    tid: nanoid(),
  };

  const serializedClaim = JSON.stringify(claim);
  const signInMessage = `${MESSAGE}${serializedClaim}`;
  const proof = await requestSignature(provider, signInMessage);

  return Base64.encode(JSON.stringify([proof, signInMessage]));
}
