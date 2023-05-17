import API from 'api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CartData from './CartData';
import ShippingInfo from './ShippingInfo';
import styles from 'styles/style';

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
  const [discountPrice, setDiscountPrice] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      address.address1 === '' ||
      address.address2 === '' ||
      !address.zipCode ||
      address.country === '' ||
      address.city === ''
    ) {
      toast.error('Please choose your delivery address!');
      return;
    }
    const shippingAddress = {
      ...address,
      country: address.country.isoCode,
      city: address.city.isoCode,
    };

    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      couponData,
      shippingAddress,
      user,
    };

    // update local storage with the updated order array
    localStorage.setItem('latestOrder', JSON.stringify(orderData));
    navigate('/payment');
  };

  const subTotalPrice = cart.reduce((acc, item) => {
    return acc + item.qty * item.discountPrice;
  }, 0);

  //This is shipping code variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = couponCode;
    API.get('/coupon/get-coupon-value/' + name).then((res) => {
      if (!res.data.couponCode) {
        toast.warning("Coupon code does'nt exists!");
        return setCouponCode('');
      }
      const shopId = res.data.couponCode.shopId;
      const couponCodeValue = res.data.couponCode.value;
      const isCouponValid = cart.length > 0 && cart.filter((item) => item.shopId === shopId);
      if (isCouponValid.length === 0) {
        toast.warning('Coupon code is not valid for this shop!');
        return setCouponCode('');
      }

      const eligibleProducts = isCouponValid.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);
      const discountPrice = (eligibleProducts * couponCodeValue) / 100;
      setDiscountPrice(discountPrice);
      setCouponData(res.data.couponCode);
    });
  };

  const discountPercentage = couponData ? (subTotalPrice * couponData.value) / 100 : '';

  const totalPrice = couponData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
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

      <div className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`} onClick={() => paymentSubmit()}>
        <h5 className='text-white'>Go to payment</h5>
      </div>
    </div>
  );
};

export default Checkout;
