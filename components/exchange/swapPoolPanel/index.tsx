import React, { useState, useMemo } from "react";
import { Box, HStack } from "@chakra-ui/react";
import PoolLiquidity from "./PoolLiquidity";
import type { TokenBalance } from "@/hooks/usePoolGearData";
import SwapPoolPanelTab from "./SwapPoolPanelTab";
import Swap from "./Swap";

const SwapPoolPanel: React.FC<{ tokensBalances: TokenBalance[] }> = ({ tokensBalances }) => {
  const TABS = useMemo(
    () => [
      {
        title: "Swap",
        key: "swap",
      },
      {
        title: "Pool",
        key: "pool",
      },
    ],
    [],
  );
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <Box>
      <HStack width="100%" spacing="0px">
        <SwapPoolPanelTab
          title={TABS[0].title}
          currentSelection={selectedTab}
          selectOption={0}
          handleClick={handleTabClick}
        />
        <SwapPoolPanelTab
          title={TABS[1].title}
          currentSelection={selectedTab}
          selectOption={1}
          handleClick={handleTabClick}
        />
      </HStack>
      {TABS[selectedTab].key === "swap" && <Swap />}
      {TABS[selectedTab].key === "pool" && <PoolLiquidity tokensBalances={tokensBalances} />}
    </Box>
  );
};

export default SwapPoolPanel;
