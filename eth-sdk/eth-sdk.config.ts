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
    rinkeby: {
      nft_wearables: "0x2D62Ec5B09c3De2106433d877EcB10C9424fCcD7",
      nft_giveaway: "0x8B07fa6767F33f6bC224a1F0d51BA4DE360480Aa",
    },
  },
});
