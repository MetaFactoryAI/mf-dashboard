// eslint-disable-next-line camelcase
import { Box, Grid, GridItem, Text, Flex, Stack, Center } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import useClaims from "@/hooks/useClaims";
import useMetafactoryData from "@/hooks/useMetafactoryData";
import { useWeb3Context } from "@/contexts/Web3Context";
import { Loading, PieChart, UnclaimedTokens, PageTitle } from "@/components/atoms";
import Table from "@/components/table";
import type { DesignerReward, BuyerReward } from "@/hooks/useMetafactoryData";
import Tab from "./Tab";

const Connected: NextPage = () => {
  const { designerRewards, buyerRewards, loading, fetchDesignerRewards, fetchBuyerRewards } =
    useMetafactoryData();
  const { loading: loadingWeb3, accountAuthBearer, account } = useWeb3Context();
  const { unclaimedTotal, claimedTotal, handleClaim } = useClaims();
  const [selectedTableTab, setSelectedTableTab] = useState<string>("buyer");
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
        Header: "Order Number",
        accessor: "order_number",
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
    () => ({
      buyer: {
        title: "Buyer",
        selectColor: "#00ECFF",
        avatar: "/avatar-default.svg",
        tabColumns: buyerTableColumns,
        tabRows: buyerRewards?.items || [],
      },
      designer: {
        title: "Designer",
        selectColor: "#FF00C3",
        avatar: "/avatar-designer.svg",
        tabColumns: designerTableColumns,
        tabRows: designerRewards?.items || [],
      },
    }),
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

  const isZeroDesignerRewards = useMemo(
    () => !designerRewards || designerRewards.items?.length === 0,
    [designerRewards],
  );

  const isZeroBuyerRewards = useMemo(
    () => !buyerRewards || buyerRewards?.items.length === 0,
    [buyerRewards],
  );

  const isZeroRewards = useMemo(
    () => isZeroDesignerRewards && isZeroBuyerRewards,
    [isZeroBuyerRewards, isZeroDesignerRewards],
  );

  const handleTabClick = useCallback(
    (tabKey: string) => {
      setSelectedTableTab(tabKey);
      // @ts-ignore
      setTableColumns(TABLE_TABS[tabKey].tabColumns);
      // @ts-ignore
      setTableRows(TABLE_TABS[tabKey].tabRows);
    },
    [TABLE_TABS],
  );

  useEffect(() => {
    if (accountAuthBearer && account) {
      fetchDesignerRewards(account, accountAuthBearer);
      fetchBuyerRewards(account, accountAuthBearer);
    }
  }, [fetchDesignerRewards, accountAuthBearer, account, fetchBuyerRewards]);

  useEffect(() => {
    if (!loading && isZeroBuyerRewards) {
      handleTabClick("designer");
    }
  }, [handleTabClick, isZeroBuyerRewards, loading]);

  useEffect(() => {
    // @ts-ignore
    setTableColumns(TABLE_TABS.buyer.tabColumns);
    setTableRows(TABLE_TABS.buyer.tabRows);
  }, [TABLE_TABS]);

  if (loading || loadingWeb3) return <Loading />;

  return (
    <Box>
      <Head>
        <title>MetaFactory - Dashboard</title>
        <meta name="description" content="My Profile" />
      </Head>

      <PageTitle title="My Profile" />
      <Grid templateColumns="repeat(10, 1fr)" width="100%">
        <GridItem
          colSpan={{ base: 10, sm: 10 }}
          display={{ base: "block", sm: "block", md: "none", lg: "none" }}
          mb="30px"
        >
          <UnclaimedTokens unclaimedTotal={unclaimedTotal} handleClaim={handleClaim} />
        </GridItem>
        <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }}>
          <Stack
            border="2px"
            borderLeft={{ base: "2px", sm: "2px", md: "0px", lg: "0px" }}
            alignItems="start"
            spacing="0px"
            direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
          >
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
            <PieChart chartData={!isZeroRewards ? pieChartData : emptyPieChartData} />
          </Stack>
        </GridItem>
        <GridItem
          colSpan={{ md: 3, lg: 3 }}
          display={{ base: "none", sm: "none", md: "block", lg: "block" }}
          ml="30px"
        >
          <UnclaimedTokens unclaimedTotal={unclaimedTotal} handleClaim={handleClaim} />
        </GridItem>

        <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg: 7 }} borderBottom="2px" my="39px">
          <Flex
            justifyContent={{ base: "start ", sm: "start", md: "start", lg: "start" }}
            borderBottom={{ base: "0px", sm: "0px", md: "2px", lg: "2px" }}
            borderLeft={{ base: "2px", sm: "2px", md: "0px", lg: "0px" }}
          >
            {!isZeroBuyerRewards && (
              <Tab
                title={TABLE_TABS.buyer.title}
                selectColor={TABLE_TABS.buyer.selectColor}
                avatar={TABLE_TABS.buyer.avatar}
                currentSelection={selectedTableTab}
                selectOption="buyer"
                handleClick={handleTabClick}
              />
            )}
            {!isZeroDesignerRewards && (
              <Tab
                title={TABLE_TABS.designer.title}
                selectColor={TABLE_TABS.designer.selectColor}
                avatar={TABLE_TABS.designer.avatar}
                currentSelection={selectedTableTab}
                selectOption="designer"
                handleClick={handleTabClick}
              />
            )}
          </Flex>
          {isZeroRewards && (
            <Center my="20px">
              <Text fontSize="35px">No data yet ...</Text>
            </Center>
          )}
          {!isZeroRewards && (
            <Table
              // @ts-ignore
              columns={tableColumns}
              data={tableRows || []}
              initialState={{
                pageSize: 10,
              }}
            />
          )}
        </GridItem>
      </Grid>
      <Box />
    </Box>
  );
};

export default Connected;
