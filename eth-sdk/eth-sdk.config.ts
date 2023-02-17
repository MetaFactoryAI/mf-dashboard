// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "@dethcrypto/eth-sdk";

export default defineConfig({
  contracts: {
    mainnet: {
      ethereum: {
        nft_wearables: "0x65725931BF9d37d7e1b1CEb90928271B572829F4",
        nft_giveaway: "0xdcDB68d061255C8eB92153218441e0E4e820c1C7",
      },
    },
    goerli: {
      nft_wearables: "0x204aB638B9F9430237d096500d7f3Baa0f416892",
      nft_giveaway: "0xd8401646686430711D5d48407D8C0bb79616baef",
    },
  },
});
