import { LandingPage } from 'components/pageComponents';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Home: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </React.Fragment>
  );
};

export default Home;
