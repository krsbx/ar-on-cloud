import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import GettingStartedPage from 'src/components/pageComponents/GettingStartedPage';

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
