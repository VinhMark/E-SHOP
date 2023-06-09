import Checkout from 'components/Checkout';
import CheckoutStep from 'components/Checkout/CheckoutStep';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import React from 'react';

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <br />
      <br />
      <CheckoutStep active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </>
  );
};

export default CheckoutPage;
