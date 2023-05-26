import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import TrackOrderDetails from 'components/User/TrackOrderDetails';
import React from 'react';

const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <TrackOrderDetails />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
