import React, { useMemo } from "react";
import { Box, HStack } from "@chakra-ui/react";
import Pool from "./Pool";
import type { TokenBalance } from "@/hooks/usePoolGearData";
import SwapPoolPanelTab from "./SwapPoolPanelTab";
import Swap from "./Swap";

export enum SwapPoolPanelTabs {
  SwapTab,
  PoolTab,
}

export const SwapPoolPanel: React.FC<{
  tokensBalances: TokenBalance[];
  tabClickCallback: (key: SwapPoolPanelTabs) => void;
  selectedTab: SwapPoolPanelTabs;
}> = ({ tokensBalances, tabClickCallback, selectedTab }) => {
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
  const handleTabClick = (tabIndex: SwapPoolPanelTabs) => {
    tabClickCallback(tabIndex);
  };

  return (
    <Box
      borderRight={{ base: "2px", sm: "2px", md: "0px", lg: "0px" }}
      borderColor="black"
      borderStyle="solid"
    >
      <HStack width="100%" spacing="0px">
        {TABS.map((tab) => (
          <SwapPoolPanelTab
            title={tab.title}
            currentSelection={selectedTab}
            selectOption={tab.key}
            handleClick={handleTabClick}
            key={`swap-pool=panel-tab-${tab.key}`}
          />
        ))}
      </HStack>
      {selectedTab === SwapPoolPanelTabs.SwapTab && <Swap />}
      {selectedTab === SwapPoolPanelTabs.PoolTab && <Pool tokensBalances={tokensBalances} />}
    </Box>
  );
};
