import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import styles from 'styles/style';
import { Link } from 'react-router-dom';
import { backend_url } from 'api/server';
import { useDispatch } from 'react-redux';
import { decrementQty, incrementQty, removeFromCart } from 'redux/actions/cart';

const Cart = ({ setOpenCart, cart }) => {
  const cartData = cart;
  const totalPrice = cart.reduce((current, value) => {
    const price = value.discountPrice ? value.discountPrice : value.originalPrice;
    return value.qty * price + current;
  }, 0);

  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-[60]'>
      <div className='fixed top-0 right-0 min-h-full w-full  800px:w-[50%] xl:w-[25%] bg-white flex flex-col justify-between shadow-sm'>
        <div>
          <div className='flex w-full justify-end pt-5 pr-5'>
            <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenCart(false)} />
          </div>

          {/* Item length */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className='pl-2 text-[20px] font-[500]'>{cartData.length} items</h5>
          </div>

          {/* Cart single item */}
          <div className='w-full border-t mt-6'>
            {cartData.length > 0 && cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>

        {/* Checkout button */}
        <div className='px-5 mb-3'>
          <Link to='/checkout'>
            <div className='h-[45px] flex items-center justify-center w-full bg-[#e44343] rounded-[5px]'>
              <h1 className='text-white text-[18px] font-[600]'>Checkout now (US${totalPrice})</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(data.qty || 1);
  const [totalPrice, setTotalPrice] = useState(data.discountPrice ? data.discountPrice : data.originalPrice * value);

  const handleIncrement = (id) => {
    setValue(value + 1);
    dispatch(incrementQty(id));
  };
  const handleDecrement = (id) => {
    setValue(value - 1 || 1);
    if (value > 1) {
      dispatch(decrementQty(id));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    const price = data.discountPrice || data.originalPrice;
    setTotalPrice(value * price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className='border-b p-4'>
      <div className='w-full flex items-center'>
        {/* Quantity */}
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373]
            rounded-full w-[25px] h-[25px] ${styles.normalFlex} 
            justify-center cursor-pointer`}
            onClick={() => handleIncrement(data._id)}
          >
            <HiPlus size={18} color='white' />
          </div>

          <span className='pl-2'>{value}</span>

          <div
            className={`${value > 1 ? 'bg-[#e44343]' : 'bg-[#a7abb14f]'} rounded-full w-[25px] 
            h-[25px] flex items-center justify-center cursor-pointer`}
            onClick={() => handleDecrement(data._id)}
          >
            <HiOutlineMinus size={18} color='white' />
          </div>
        </div>
        {/* Image */}
        <img src={`${backend_url}/${data.images[0]}`} alt='' className='w-[80px] h-[80px] ml-2 object-cover' />

        {/* Info */}
        <div className='pl-[5px]'>
          <h1>{data.name}</h1>
          <h4>
            {data.discountPrice ? (
              <p className='space-x-1'>
                <span className={styles.price}>${data.originalPrice}</span>
                <span>${data.discountPrice}</span> * {value}
              </p>
            ) : (
              <span>${data.originalPrice}</span>
            )}
          </h4>
          <h4 className='font-[600] text-[17px] pt-[13px] text-[#d02222] font-Roboto'>US ${totalPrice}</h4>
        </div>

        {/* Button delete */}
        <button className='flex-1' onClick={() => handleRemoveItem(data._id)}>
          <RxCross1 className='cursor-pointer float-right' />
        </button>
      </div>
    </div>
  );
};

export default Cart;
