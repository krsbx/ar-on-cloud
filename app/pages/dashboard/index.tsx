import React from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import DashboardPage from 'src/components/pageComponents/dashboardPage/DashboardPage';

const UserDashboard: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>About Us | Augmented Reality on Web</title>
        <meta name="description" content="Developed by KRSBX" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardPage />
    </React.Fragment>
  );
};

export default UserDashboard;
