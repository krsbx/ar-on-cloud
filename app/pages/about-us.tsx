import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import { AboutUsPage } from 'src/components/pageComponents';

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
