import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { BsCartPlus } from 'react-icons/bs';
import styles from 'styles/style';
import { useDispatch } from 'react-redux';
import { backend_url } from 'api/server';
import { removeToWishList } from 'redux/actions/favorite';
import { addToCart } from 'redux/actions/cart';
import { toast } from 'react-toastify';

const Wishlist = ({ setOpenWishList, wishItems }) => {
  const dispatch = useDispatch();
  const cartData = wishItems;

  const handleRemoveToWishList = (id) => {
    dispatch(removeToWishList(id));
  };

  const handleAddToCart = (data) => {
    const cartData = { ...data, qty: 1 };
    dispatch(addToCart(cartData));
    toast.success('Item added to cart successfully!');
  };

  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-[#0000004a] z-[60]'>
      <div className='fixed top-0 right-0 min-h-full w-full 800px:w-[50%] xl:w-[25%] bg-white flex flex-col shadow-sm'>
        {/* button close popup */}
        <div className='flex w-full justify-end pt-5 pr-5'>
          <RxCross1 size={25} className='cursor-pointer' onClick={() => setOpenWishList(false)} />
        </div>

        <div className={`${styles.normalFlex} p-4`}>
          <AiOutlineHeart size={30} />
          <h5 className='pl-2 text-[20px] font-[500]'>{cartData.length} items</h5>
        </div>

        {/* items */}
        {cartData.length > 0 &&
          cartData.map((i, index) => (
            <WishListSingle
              data={i}
              key={index}
              handleRemoveToWishList={handleRemoveToWishList}
              handleAddToCart={handleAddToCart}
            />
          ))}
      </div>
    </div>
  );
};

const WishListSingle = ({ data, handleRemoveToWishList, handleAddToCart }) => {
  return (
    <div className='border-b p-4'>
      <div className='w-full flex items-center' onClick={() => handleRemoveToWishList(data._id)}>
        <RxCross1 className='cursor-pointer flex-shrink-0' />
        <img
          src={`${backend_url}/${data.images[0]}`}
          className='w-[80px] h-[80px] object-cover ml-2 flex-shrink-0'
          alt=''
        />
        <div className='pl-[5px]'>
          <h1 className='line-clamp-2'>{data.name}</h1>
          <h4 className='font-[600] text-[17px] pt-[13px] text-[#d02222] font-Roboto'>${data.originalPrice}</h4>
        </div>
        <div className='flex-[100px]' onClick={() => handleAddToCart(data)}>
          <BsCartPlus size={25} className='float-right cursor-pointer' title='Add to cart' />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
