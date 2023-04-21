import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import styles from 'styles/style';
import { Link } from 'react-router-dom';

const Cart = ({ setOpenCart }) => {
  const cartData = [
    { name: 'Iphone 14 pro max (256gb)', description: 'test', price: 999 },
    { name: 'Iphone 14 pro max (256gb)', description: 'test', price: 999 },
    { name: 'Iphone 14 pro max (256gb)', description: 'test', price: 999 },
  ];

  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
      <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
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
            {cartData && cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>

        {/* Checkout button */}
        <div className='px-5 mb-3'>
          <Link to='/checkout'>
            <div className='h-[45px] flex items-center justify-center w-full bg-[#e44343] rounded-[5px]'>
              <h1 className='text-white text-[18px] font-[600]'>Checkout now (US$1080)</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className='border-b p-4'>
      <div className='w-full flex items-center'>
        {/* Quantity */}
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373]
            rounded-full w-[25px] h-[25px] ${styles.normalFlex} 
            justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color='white' />
          </div>

          <span className='pl-2'>{value}</span>

          <div
            className={`${value > 1 ? 'bg-[#e44343]' : 'bg-[#a7abb14f]'} rounded-full w-[25px] 
            h-[25px] flex items-center justify-center cursor-pointer`}
            onClick={() => setValue(value - 1 || 1)}
          >
            <HiOutlineMinus size={18} color='white' />
          </div>
        </div>
        {/* Image */}
        <img src='https://picsum.photos/200/300' alt='' className='w-[80px] h-[80px] ml-2 object-cover' />

        {/* Info */}
        <div className='pl-[5px]'>
          <h1>{data.name}</h1>
          <h4 className='font-[400] text-[15px] text-[#00000082]'>
            ${data.price} * {value}
          </h4>
          <h4 className='font-[600] text-[17px] pt-[13px] text-[#d02222] font-Roboto'>US ${totalPrice}</h4>
        </div>

        {/* Button delete */}
        <button className='flex-1'>
          <RxCross1 className='cursor-pointer float-right' />
        </button>
      </div>
    </div>
  );
};

export default Cart;