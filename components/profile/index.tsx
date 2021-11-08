import { Center, Heading } from '@chakra-ui/layout';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = () => (
  <Center h="calc(100vh - 96px)">
    <Head>
      <title>MetaFactory - Dashboard</title>
      <meta name="description" content="MetaFactory Dashboard" />
    </Head>
    <Heading as="h1" textAlign="center">
      Profile will be here
    </Heading>
  </Center>
);

export default Home;
