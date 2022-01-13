import type { Web3Provider } from "@ethersproject/providers";

export default async function requestSignature(
  provider: Web3Provider,
  rawMessage: string,
): Promise<string> {
  const ethereum = provider.provider;
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  if (!ethereum.request) throw new Error("invalid ethereum provider");

  let params = [rawMessage, address.toLowerCase()];
  if (ethereum.isMetaMask) {
    params = [params[1], params[0]];
  }
  return (await ethereum.request({
    method: "personal_sign",
    params,
  })) as string;
}
