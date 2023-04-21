import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from 'react-icons/bs';
import styles from 'styles/style';

const Wishlist = ({ setOpenWishList }) => {
  const cartData = [
    {
      name: 'Iphone 14 pro max (256gb) Iphone 14 pro max (256gb) Iphone 14 pro max (256gb)',
      description: 'test',
      price: 999,
    },
    { name: 'Iphone 14 pro max (256gb)', description: 'test', price: 999 },
    { name: 'Iphone 14 pro max (256gb)', description: 'test', price: 999 },
  ];

  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-[#0000004a] z-10'>
      <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col shadow-sm'>
        {/* button close popup */}
        <div className='flex w-full justify-end pt-5 pr-5'>
          <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishList(false)} />
        </div>

        <div className={`${styles.normalFlex} p-4`}>
          <AiOutlineHeart size={30} />
          <h5 className='pl-2 text-[20px] font-[500]'>{cartData.length} items</h5>
        </div>

        {/* items */}
        {cartData.map((i, index) => (
          <WishListSingle data={i} key={index} />
        ))}
      </div>
    </div>
  );
};

const WishListSingle = ({ data }) => {
  return (
    <div className='border-b p-4'>
      <div className='w-full flex items-center'>
        <RxCross1 className='cursor-pointer flex-shrink-0' />
        <img src='https://picsum.photos/200/300' className='w-[80px] h-[80px] object-cover ml-2 flex-shrink-0' alt='' />
        <div className='pl-[5px]'>
          <h1 className='line-clamp-2'>{data.name}</h1>
          <h4 className='font-[600] text-[17px] pt-[13px] text-[#d02222] font-Roboto'>${data.price}</h4>
        </div>
        <div className='flex-[100px]'>
          <BsCartPlus size={25} className='float-right cursor-pointer' title='Add to cart' />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
