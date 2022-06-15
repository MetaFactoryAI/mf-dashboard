// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "@dethcrypto/eth-sdk";

export default defineConfig({
  contracts: {
    rinkeby: {
      nft_wearables: "0xf9a28b227bDaC129eB85Ca3F27F55d1dD9ecFD94",
      nft_giveaway: "0x08749a19797531979654D8384112353c7F046aC5",
    },
  },
});
