import { AboutUsPage } from 'components/pageComponents';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const AboutUs: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Us | Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AboutUsPage />
    </React.Fragment>
  );
};

export default AboutUs;
