import DashboardPage from 'components/pageComponents/dashboardPage/DashboardPage';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

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
