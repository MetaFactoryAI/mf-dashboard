// eslint-disable-next-line camelcase
import { Box, Grid, GridItem, Text, Flex, HStack, Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState, useMemo } from "react";
import useClaims from "@/hooks/useClaims";
import useFetchMetafactoryGraph from "@/hooks/useFetchMetafactoryGraph";
import { useWeb3Context } from "@/contexts/Web3Context";
import { Loading, PieChart } from "@/components/atoms";
import Table from "@/components/table";
import type { DesignerReward, BuyerReward } from "@/hooks/useFetchMetafactoryGraph";
import UnclaimedTokens from "../atoms/UnclaimedTokens";
import Tab from "./Tab";

const Connected: NextPage = () => {
  const { designerRewards, buyerRewards, loading, fetchDesignerRewards, fetchBuyerRewards } =
    useFetchMetafactoryGraph();
  const { loading: loadingWeb3, accountAuthBearer, account } = useWeb3Context();
  const { unclaimedTotal, claimedTotal, handleClaim } = useClaims();
  const [selectedTableTab, setSelectedTableTab] = useState<number>(0);
  const [tableRows, setTableRows] = useState<DesignerReward[] | BuyerReward[]>([]);
  const [tableColumns, setTableColumns] = useState();
  const designerTableColumns = useMemo(
    () => [
      {
        Header: "Product Title",
        accessor: "product_title",
        style: {
          fontSize: "16px",
          fontFamily: "body_semi_bold",
          fontWeight: "500",
          width: { md: "40%", lg: "40%" },
          minWidth: { md: "210px", lg: "210px" },
        },
      },
      {
        Header: "Amount ($ROBOT)",
        accessor: "amount",
        style: {
          fontFamily: "body_bold",
          fontSize: "18px",
          fontWeight: "800",
        },
      },
      {
        Header: "Product id",
        accessor: "product_id",
        style: {
          fontFamily: "body_regular",
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "left",
        },
      },
    ],
    [],
  );

  const buyerTableColumns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "order_id",
        style: {
          fontSize: "16px",
          fontFamily: "body_semi_bold",
          fontWeight: "500",
          width: { md: "40%", lg: "40%" },
          minWidth: { md: "210px", lg: "210px" },
        },
      },
      {
        Header: "Amount ($ROBOT)",
        accessor: "amount",
        style: {
          fontFamily: "body_bold",
          fontSize: "18px",
          fontWeight: "800",
        },
      },
      {
        Header: "Date",
        accessor: "date",
        style: {
          fontFamily: "body_regular",
          fontSize: "16px",
          fontWeight: "400",
          textAlign: "left",
        },
      },
    ],
    [],
  );
  const TABLE_TABS = useMemo(
    () => [
      {
        title: "Buyer",
        selectColor: "#00ECFF",
        avatar: "/avatar-default.svg",
        tabColumns: buyerTableColumns,
        tabRows: buyerRewards?.items || [],
      },
      {
        title: "Designer",
        selectColor: "#FF00C3",
        avatar: "/avatar-designer.svg",
        tabColumns: designerTableColumns,
        tabRows: designerRewards?.items || [],
      },
    ],
    [buyerRewards?.items, buyerTableColumns, designerRewards?.items, designerTableColumns],
  );

  const pieChartData = useMemo(
    () => [
      {
        key: `Buyer${String.fromCharCode(160)}Rewards`,
        // @ts-ignore
        value: buyerRewards?.total || 0,
        color: "#00ECFF",
        avatarSrc: "/avatar-default.svg",
      },
      {
        key: `Designer${String.fromCharCode(160)}Rewards`,
        // @ts-ignore
        value: designerRewards?.total || 0,
        color: "#FF2ECE",
        avatarSrc: "/avatar-designer.svg",
      },
    ],
    [buyerRewards?.total, designerRewards?.total],
  );

  const emptyPieChartData = useMemo(
    () => [
      {
        key: "No Rewards",
        value: 100,
        color: "#00ECFF",
        avatarSrc: "/avatar-default.svg",
      },
    ],
    [],
  );

  const handleTabClick = (tabIndex: number) => {
    setSelectedTableTab(tabIndex);
    // @ts-ignore
    setTableColumns(TABLE_TABS[tabIndex].tabColumns);
    setTableRows(TABLE_TABS[tabIndex].tabRows);
  };

  useEffect(() => {
    if (accountAuthBearer && account) {
      fetchDesignerRewards(account, accountAuthBearer);
      fetchBuyerRewards(account, accountAuthBearer);
    }
  }, [fetchDesignerRewards, accountAuthBearer, account, fetchBuyerRewards]);

  useEffect(() => {
    // @ts-ignore
    setTableColumns(TABLE_TABS[0].tabColumns);
    setTableRows(TABLE_TABS[0].tabRows);
  }, [TABLE_TABS]);

  return (
    <Box>
      <Head>
        <title>MetaFactory - Dashboard</title>
        <meta name="description" content="MetaFactory Dashboard" />
      </Head>
      {(loading || loadingWeb3) && <Loading />}
      {!loading && !loadingWeb3 && (
        <Grid templateColumns="repeat(10, 1fr)" width="100%">
          <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }}>
            <HStack border="2px" alignItems="start" spacing="0px">
              <Box>
                <Box backgroundColor="black" color="white">
                  <Text
                    pt="24px"
                    pl="24px"
                    pb="22px"
                    pr="146px"
                    fontSize="32px"
                    fontFamily="body_bold"
                    fontWeight="800"
                  >
                    Earning
                  </Text>
                </Box>
                <Box>
                  <Text
                    pt="16px"
                    pl="24px"
                    pr="146px"
                    fontSize="14px"
                    fontFamily="body_regular"
                    fontWeight="800"
                  >
                    Total Claimed
                  </Text>
                  <Text
                    pt="6px"
                    pl="24px"
                    pr="146px"
                    fontSize="24px"
                    fontFamily="body_bold"
                    fontWeight="800"
                  >
                    {claimedTotal} ROBOT
                  </Text>
                </Box>
              </Box>
              <Flex flex="1" justifyContent="center" borderLeft="2px">
                <Center width="100%">
                  <Box width="100%" maxWidth="400px">
                    <PieChart
                      chartData={
                        (designerRewards && designerRewards.items?.length > 0) ||
                        (buyerRewards && buyerRewards?.items.length > 0)
                          ? pieChartData
                          : emptyPieChartData
                      }
                    />
                  </Box>
                </Center>
              </Flex>
            </HStack>
          </GridItem>
          <GridItem
            colSpan={{ md: 3, lg: 3 }}
            display={{ base: "none", sm: "none", md: "block", lg: "block" }}
            ml="30px"
          >
            <UnclaimedTokens unclaimedTotal={unclaimedTotal} handleClaim={handleClaim} />
          </GridItem>

          <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }} borderBottom="2px" my="39px">
            <Flex justifyContent={{ base: "start ", sm: "start", md: "start", lg: "start" }}>
              <Tab
                title={TABLE_TABS[0].title}
                selectColor={TABLE_TABS[0].selectColor}
                avatar={TABLE_TABS[0].avatar}
                currentSelection={selectedTableTab}
                selectOption={0}
                handleClick={handleTabClick}
              />
              <Tab
                title={TABLE_TABS[1].title}
                selectColor={TABLE_TABS[1].selectColor}
                avatar={TABLE_TABS[1].avatar}
                currentSelection={selectedTableTab}
                selectOption={1}
                handleClick={handleTabClick}
              />
            </Flex>
            <Table
              // @ts-ignore
              columns={tableColumns}
              data={tableRows || []}
              initialState={{
                pageSize: 10,
              }}
            />
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};

export default Connected;
