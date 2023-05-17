import React from 'react';
import styles from 'styles/style';

const CartData = ({
  card,
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  discountPercentage,
  setCouponCode,
}) => {
  return (
    <div className='w-full bg-white rounded-md p-5 pb-8'>
      <div className='flex justify-between'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>Subtotal:</h3>
        <h5 className='text-[18px] font-[600]'>${subTotalPrice}</h5>
      </div>
      <div className='flex justify-between mt-3'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>Shipping:</h3>
        <h5 className='text-[18px] font-[600]'>${shipping}</h5>
      </div>
      <div className='flex justify-between my-3'>
        <h3 className='text-[16px] font-[400] text-[#000000a4]'>Discount:</h3>
        <h5 className='text-[18px] font-[600] text-[red]'>
          {discountPercentage ? '- $' + discountPercentage.toString() : '-'}
        </h5>
      </div>
      <hr />
      <h5 className='text-[18px] font-[600] text-end mt-3'>${totalPrice}</h5>

      <form className='mt-8' onSubmit={handleSubmit}>
        <input
          type='text'
          className={`${styles.input} h-[40px] pl-2`}
          placeholder='Coupon code'
          required
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <button
          type='submit'
          className='w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] mt-3 rounded-[3px] cursor-pointer'
        >
          Apply code
        </button>
      </form>
    </div>
  );
};

export default CartData;
