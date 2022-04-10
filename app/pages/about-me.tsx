import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { AboutMePage } from 'src/components/pageComponents';

const AboutMe: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Me | Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AboutMePage />
    </React.Fragment>
  );
};

export default AboutMe;
