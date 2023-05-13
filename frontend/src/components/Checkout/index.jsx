import API from 'api';
import SelectInput from 'components/Form/SelectInput';
import { Country, State } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from 'styles/style';
import CartData from './CartData';
import ShippingInfo from './ShippingInfo';

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    country: '',
    city: '',
    zipCode: '',
    address1: '',
    address2: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponData, setCouponData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = (e) => {
    e.preventDefault();
  };

  const subTotalPrice = cart.reduce((acc, item) => {
    return acc + item.qty * item.discountPrice;
  }, 0);

  //This is shipping code variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = couponCode;
    const { data } = API.get('/coupon/get-coupon-value/' + name).then((res) => {
      if (!res.data.couponCode) {
        toast.warning("Coupon code does'nt exists!");
        return setCouponCode('');
      }
      const shopId = res.data.couponCode.shopId;
      const isCouponValid = cart.length > 0 && cart.filter((item) => item.shopId === shopId);
      if (isCouponValid.length === 0) {
        toast.warning('Coupon code is not valid for this shop!');
        return setCouponCode('');
      }
    });
  };

  const discountPercentage = couponData ? (subTotalPrice * couponData.value) / 100 : '';

  const totalPrice = couponData
    ? (subTotalPrice + shipping - couponData.value).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className='w-full flex flex-col items-center py-8'>
      <div className='w-[90%] 1000px:w-[70%] block 800px:flex'>
        <div className='w-full 800px:w-[65%]'>
          <ShippingInfo user={user} address={address} setAddress={setAddress} />
        </div>
        <div className='w-full 800px:mt-0  800px:w-[35%] mt-8'>
          <CartData
            cart={cart}
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            discountPercentage={discountPercentage}
            setCouponCode={setCouponCode}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
