import type { Web3Provider, BaseProvider } from "@ethersproject/providers";
import { verifyMessage } from "@ethersproject/wallet";
import { toUtf8Bytes } from "@ethersproject/strings";
import { arrayify, hexlify } from "@ethersproject/bytes";
import { Contract } from "@ethersproject/contracts";
import { hashMessage } from "@ethersproject/hash";

const smartWalletABI = [
  "function isValidSignature(bytes32 _message, bytes _signature) public view returns (bool)",
];

enum WalletType {
  EOA,
  SMART,
}

export async function requestSignature(
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

export async function verifySignature(
  address: string,
  message: string,
  signature: string,
  provider: BaseProvider,
): Promise<boolean> {
  const walletType = await getWalletType(address, provider);

  if (walletType === WalletType.EOA) {
    const recoveredAddress = verifyMessage(message, signature);
    return address === recoveredAddress;
  }

  // Smart wallet
  const arrayishMessage = toUtf8Bytes(message);
  const hexMessage = hexlify(arrayishMessage);
  const hexArray = arrayify(hexMessage);
  const hashedMessage = hashMessage(hexArray);

  const contract = new Contract(address, smartWalletABI, provider);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return (await contract.isValidSignature(hashedMessage, signature)) as boolean;
  } catch (error) {
    throw new Error("unsupported smart wallet");
  }
}

async function getWalletType(address: string, provider: BaseProvider): Promise<WalletType> {
  const code = await provider.getCode(address);
  return code === "0x" ? WalletType.EOA : WalletType.SMART;
}
