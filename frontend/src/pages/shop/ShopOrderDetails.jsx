import React from 'react';
import DashBoardHeader from '../../components/shop/Layout/DashBoardHeader';
import Footer from 'components/Layout/Footer';
import OrderDetails from '../../components/shop/OrderDetails';

const ShopOrderDetails = () => {
  return (
    <div>
      <DashBoardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
