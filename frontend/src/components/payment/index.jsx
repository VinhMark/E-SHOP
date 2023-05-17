import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import API from 'api';
import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'styles/style';

const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const stripe = useStripe();
  const dispatch = useDispatch();
  const elements = useElements();
  const navigate = useNavigate();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('latestOrder'));
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: 'Sunflower',
            amount: {
              currency_code: 'USD',
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: 'NO_SHIPPING',
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      let paymentInfo = payer;
      if (paymentInfo) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    order.paymentInfo = {
      id: paymentInfo.payer_id,
      status: 'succeeded',
      type: 'Paypal',
    };

    await API.post('/order/create-order', order, config).then((res) => {
      setOpen(false);
      toast.success('Order successful!');
      localStorage.setItem('cartItems', JSON.stringify([]));
      localStorage.setItem('latestOrder', JSON.stringify([]));
      navigate('/order/success');
      dispatch({ type: 'ClearCart' });
    });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
    subTotalPrice: orderData?.subTotalPrice,
    coupon: orderData?.couponData,
    discountPrice: orderData?.discountPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/payment/process', paymentData, config);

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: 'Credit Card',
          };

          await API.post('/order/create-order', order, config).then((res) => {
            setOpen(false);
            navigate('/order/success');
            dispatch({ type: 'ClearCart' });
            toast.success('Order successfully!');
            localStorage.setItem('cartItems', JSON.stringify([]));
            localStorage.setItem('latestOrder', JSON.stringify([]));
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    order.paymentInfo = {
      type: 'Cash On Delivery',
    };
    await API.post('/order/create-order', order, config).then((res) => {
      setOpen(false);
      navigate('/order/success');
      dispatch({ type: 'ClearCart' });
      toast.success('Order successfully!');
      localStorage.setItem('cartItems', JSON.stringify([]));
      localStorage.setItem('latestOrder', JSON.stringify([]));
    });
  };

  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className='w-[90%] 1000px:w-[70%] block 800px:flex'>
        <div className='w-full 800px:w-[65%]'>
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className='w-full 800px:w-[35%] 800px:mt-0 mt-8'>
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({ user, open, setOpen, onApprove, createOrder, paymentHandler, cashOnDeliveryHandler }) => {
  const [select, setSelect] = useState(1);
  const [cardForm, setCardForm] = useState({
    name: user ? user.name : '',
  });

  return (
    <div className='w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8'>
      {/* select button */}
      <div>
        {/* pay with card method */}
        <div className='flex w-full pb-5 border-b mb-2'>
          <div
            className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px]  border-[#1d1a1ab4] relative flex items-center justify-center'
            onClick={() => setSelect(1)}
          >
            {select === 1 && <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full'></div>}
          </div>
          <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'> Pay with Debit/credit card</h4>
        </div>
        {select === 1 && (
          <form className='w-full flex flex-wrap border-b' onSubmit={paymentHandler}>
            <div className='w-full flex pb-3'>
              {/* Name */}
              <div className='w-[50%]'>
                <label className='block pb-2'>Name On card</label>
                <input
                  type='text'
                  placeholder={user && user.name}
                  className={`${styles.input} !w-[95%] !h-[40px] text-[#444]`}
                  value={cardForm.name}
                  onChange={(e) => setCardForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className='w-[50%]'>
                <label className='block pb-2'>Exp Date</label>
                <CardExpiryElement
                  className={styles.input}
                  options={{
                    style: {
                      base: {
                        fontSize: '19px',
                        lineHeight: 1.5,
                        color: '#444',
                      },
                      empty: {
                        color: '#3a120a',
                        backgroundColor: 'transparent',
                        '::placeholder': {
                          color: '#444',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div className='w-full flex pb-3'>
              <div className='w-[50%]'>
                <label className='block pb-2'>Card number</label>
                <CardNumberElement
                  className={`${styles.input} !h-[35px] !w-[95%]`}
                  options={{
                    style: {
                      base: {
                        fontSize: '19px',
                        lineHeight: 1.5,
                        color: '#444',
                      },
                      empty: {
                        color: '#3a120a',
                        backgroundColor: 'transparent',
                        '::placeholder': {
                          color: '#444',
                        },
                      },
                    },
                  }}
                />
              </div>

              <div className='w-[50%]'>
                <label className='block pb-2'>CVV</label>
                <CardCvcElement
                  className={`${styles.input} !h-[35px]`}
                  options={{
                    style: {
                      base: {
                        fontSize: '19px',
                        lineHeight: 1.5,
                        color: '#444',
                      },
                      empty: {
                        color: '#3a120a',
                        backgroundColor: 'transparent',
                        '::placeholder': {
                          color: '#444',
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>

            <input
              type='submit'
              value='Submit'
              className={`${styles.button} !bg-[#f63b60 text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]]`}
            />
          </form>
        )}

        {/* paypal payment */}
        <div>
          <div className='flex w-full pb-5 border-b mb-2 pt-3'>
            <div
              className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4]  relative flex items-center justify-center'
              onClick={() => setSelect(2)}
            >
              {select === 2 && <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full'></div>}
            </div>
            <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'>Pay with Paypal</h4>
          </div>

          {select === 2 && (
            <div className='w-full flex border-b'>
              <div
                className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                onClick={() => setOpen(true)}
              >
                Pay Now
              </div>

              {open && (
                <div className='w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[9999]'>
                  <div className='w-full 800px:w-[40%] h-screen 800px:h-[90vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-9 relative overflow-y-auto'>
                    <div className='w-full flex justify-end p-3'>
                      <RxCross1
                        size={30}
                        className='cursor-pointer absolute top-3 right-3'
                        onClick={() => setOpen(false)}
                      />
                    </div>
                    <PayPalScriptProvider
                      options={{
                        'client-id': 'Ad9pKwrdfuFsAUo4HQPJ2j69eHoZhBy7Kg-rd_iUdkP3QioYU3gGGlLtWTliqR1PikvGde0yWuQV8u2g',
                      }}
                    >
                      <PayPalButtons style={{ layout: 'vertical' }} onApprove={onApprove} createOrder={createOrder} />
                    </PayPalScriptProvider>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* cash on delivery */}
        <div>
          <div className='flex w-full pb-5 border-b mb-2 pt-3 cursor-pointer' onClick={() => setSelect(3)}>
            <div className='w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center'>
              {select === 3 && <div className='w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full' />}
            </div>
            <h4 className='text-[18px] pl-2 font-[600] text-[#000000b1]'>Cash on Delivery</h4>
          </div>

          {/* cash on delivery */}
          {select === 3 && (
            <form className='w-full flex' onSubmit={cashOnDeliveryHandler}>
              <input
                type='submit'
                className={`${styles.button} !bg-[#f63b60]  text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                value='Confirm'
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className='w-full bg-white rounded-md p-5 pb-8'>
      <div className='flex justify-between'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>Subtotal:</h3>
        <h5 className='text-[16px] font-[400] text-[#000000a4]'>${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className='flex justify-between'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>Shipping:</h3>
        <h5 className='text-[16px] font-[400] text-[#000000a4]'>${shipping}</h5>
      </div>
      <br />
      <div className='flex justify-between'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>Discount:</h3>
        <h5 className='text-[16px] font-[400] text-[#000000a4]'>
          {orderData?.discountPrice ? '$' + orderData.discountPrice : '-'}
        </h5>
      </div>
      <h5 className='text-[18px] font-[600] text-end pt-3'>${orderData?.totalPrice}</h5>
    </div>
  );
};

export default Payment;
