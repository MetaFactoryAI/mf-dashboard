import qs from "qs";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { IERC20__factory } from "types/ethers-contracts";
import type { SwapToken } from "@/components/exchange/swapPoolPanel/Swap";

export type Quote0xApi = {
  allowanceTarget: string;
  sellTokenAddress: string;
  sellAmount: string;
  to: string;
  data: string;
  value: string;
  gasPrice: string;
  gas: string;
};

export const getQuote = async (sellToken: SwapToken, buyToken: SwapToken) => {
  const normalizedSellBalance = () =>
    ethers.utils.parseEther(sellToken.balance.toString()).toString();
  const normalizedBuyBalance = () =>
    ethers.utils.parseEther(buyToken.balance.toString()).toString();
  const swapAmount =
    sellToken.balance > 0
      ? { sellAmount: normalizedSellBalance() }
      : { buyAmount: normalizedBuyBalance() };
  const params = {
    sellToken: sellToken.address,
    buyToken: buyToken.address,
    ...swapAmount,
  };

  return fetch(`https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`);
};

export const swapTokens = async (
  from: string,
  provider: ethers.providers.Web3Provider,
  swapQuote: Quote0xApi,
  successCallback: () => void,
  // @ts-ignore
  failCallback: (error) => void,
) => {
  const signer = provider.getSigner();

  // grant allowance for all but the ETH token
  if (swapQuote.allowanceTarget !== "0x0000000000000000000000000000000000000000") {
    const erc20Contract = IERC20__factory.connect(swapQuote.sellTokenAddress, signer);
    await erc20Contract.approve(swapQuote.allowanceTarget, ethers.constants.MaxUint256);
  }

  const tx = {
    from,
    to: swapQuote.to,
    data: ethers.utils.hexlify(swapQuote.data),
    value: BigNumber.from(swapQuote.value),
    gasLimit: BigNumber.from(swapQuote.gas),
    gasPrice: BigNumber.from(swapQuote.gasPrice),
  };
  signer
    .sendTransaction(tx)
    .then((_result) => {
      successCallback();
    })
    .catch((error) => {
      failCallback(error);
    });
};
