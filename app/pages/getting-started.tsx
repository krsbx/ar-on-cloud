import GettingStartedPage from 'components/pageComponents/GettingStartedPage';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const AboutMe: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Getting Started | Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GettingStartedPage />
    </React.Fragment>
  );
};

export default AboutMe;
