import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import SummaryField2 from "./shared/SummaryField2";
import { formatAddress } from "@/utils/presentationHelper";
import type { CoinData } from "@/hooks/useCoinData";

const CoinDataSummary: React.FC<{
  coinData: CoinData[];
}> = ({ coinData }) => (
  <Box pt="40px">
    {coinData.map((_element, index) => {
      // skip first few values which are shown under the Chart in the main page
      if (index > 3 && index < 8 && index % 2 === 0) {
        return (
          <Stack spacing="0px" direction="row">
            <SummaryField2 title={coinData[index].title} value={coinData[index].value.toString()} />
            <SummaryField2
              title={coinData[index + 1].title}
              value={coinData[index + 1].value.toString()}
            />
          </Stack>
        );
      }

      return null;
    })}
    <Stack spacing="0px" direction="row">
      <SummaryField2
        title={coinData[8].title}
        value={formatAddress(coinData[8].value.toString())}
        redirectLink={`https://etherscan.io/address/${coinData[8].value}`}
      />
      <SummaryField2
        title={coinData[9].title}
        value={formatAddress(coinData[9].value.toString())}
        redirectLink={`https://etherscan.io/address/${coinData[9].value}`}
      />
    </Stack>
  </Box>
);

export default CoinDataSummary;
