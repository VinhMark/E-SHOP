import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import UserOrderDetails from 'components/User/UserOrderDetails';
import React from 'react';

const OrderDetailsPage = () => {
  return (
    <div>
      <Header />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
