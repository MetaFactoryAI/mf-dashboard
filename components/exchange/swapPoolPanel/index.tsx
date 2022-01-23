import React, { useState, useMemo } from "react";
import { Box, HStack } from "@chakra-ui/react";
import PoolLiquidity from "./PoolLiquidity";
import type { TokenBalance } from "@/hooks/usePoolGearData";
import SwapPoolPanelTab from "./SwapPoolPanelTab";
import Swap from "./Swap";

export enum SwapPoolPanelTabs {
  SwapTab,
  PoolTab,
}

const SwapPoolPanel: React.FC<{ tokensBalances: TokenBalance[] }> = ({ tokensBalances }) => {
  const TABS = useMemo(
    () => [
      {
        title: "Swap",
        key: SwapPoolPanelTabs.SwapTab,
      },
      {
        title: "Pool",
        key: SwapPoolPanelTabs.PoolTab,
      },
    ],
    [],
  );
  const [selectedTab, setSelectedTab] = useState<SwapPoolPanelTabs>(SwapPoolPanelTabs.SwapTab);

  const handleTabClick = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  return (
    <Box>
      <HStack width="100%" spacing="0px">
        {TABS.map((tab) => (
          <SwapPoolPanelTab
            title={tab.title}
            currentSelection={selectedTab}
            selectOption={tab.key}
            handleClick={handleTabClick}
          />
        ))}
      </HStack>
      {selectedTab === SwapPoolPanelTabs.SwapTab && <Swap />}
      {selectedTab === SwapPoolPanelTabs.PoolTab && (
        <PoolLiquidity tokensBalances={tokensBalances} />
      )}
    </Box>
  );
};

export default SwapPoolPanel;
