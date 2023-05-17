import CheckoutStep from 'components/Checkout/CheckoutStep';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import Payment from 'components/payment';
import React from 'react';

const PaymentPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutStep active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
