import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from 'styles/style';
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from 'react-icons/ai';
import ProductDetailCard from '../ProductDetailCard/ProductDetailCard';
import { backend_url } from 'api/server';
import { addToWishList, removeToWishList } from 'redux/actions/favorite';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from 'redux/actions/cart';
import Ratings from 'components/Products/Ratings';

const ProductCard = ({ data, isEvent }) => {
  const dispatch = useDispatch();
  const { wishItems } = useSelector((state) => state.wish);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const handleAddToWishList = () => {
    setClick(true);
    dispatch(addToWishList(data));
    toast.success('Item added to wish list successfully!');
  };
  const handleRemoveToWishList = () => {
    setClick(false);
    dispatch(removeToWishList(data._id));
  };

  const handleAddToCart = () => {
    const cartData = { ...data, qty: 1 };
    dispatch(addToCart(cartData));
    toast.success('Item added to cart successfully!');
  };

  useEffect(() => {
    const isExists = wishItems.some((i) => i._id === data._id);
    if (isExists) {
      setClick(true);
    }
  }, [data._id, wishItems]);

  return (
    <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative'>
      <div className='flex justify-end'></div>
      <Link to={`/product/${data.slug}${isEvent ? '?isEvent=true' : ''}`}>
        <img src={`${backend_url}/${data.images[0]}`} alt='' className='w-full h-[170px] object-contain' />
      </Link>
      <Link to={`/shop/${data.shop._id}`}>
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>
      <Link to={`/product/${data.slug}`}>
        <h4 className='mb-3 font-[500] line-clamp-2 '>{data.name}</h4>

        <div className='flex items-center'>
          <Ratings ratings={data.ratings} />
          {data.reviews && <span>({data.reviews.length})</span>}
        </div>

        {/* Price and discount total sell */}
        <div className='py-2 flex items-center justify-between'>
          {/* price */}
          <div className='flex'>
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.originalPrice === 0 ? data.originalPrice : data.discountPrice} $
            </h5>
            <h4 className={`${styles.price}`}>{data.originalPrice ? data.originalPrice + ' $' : null}</h4>
          </div>
          {/* total sell */}
          <span className='font-[500] text-[17px] text-[#68d284]'>
            {data.sold_out ? data.sold_out + ' (sold)' : null}
          </span>
        </div>
      </Link>

      {/* side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            onClick={() => handleRemoveToWishList()}
            color={click ? 'red' : '#333'}
            title='Remove from Wishlist'
            className='cursor-pointer absolute right-2 top-5'
          />
        ) : (
          <AiOutlineHeart
            size={22}
            onClick={() => handleAddToWishList()}
            color={click ? 'red' : '#333'}
            title='Add to Wishlist'
            className='cursor-pointer absolute right-2 top-5'
          />
        )}

        <AiOutlineEye
          size={22}
          onClick={() => setOpen(true)}
          color='#333'
          title='Quick view'
          className='cursor-pointer absolute right-2 top-14'
        />
        <AiOutlineShoppingCart
          size={22}
          color='#444'
          title='Add to card'
          className='cursor-pointer absolute right-2 top-24'
          onClick={() => handleAddToCart()}
        />

        {open ? (
          <ProductDetailCard
            setOpen={setOpen}
            data={data}
            handleAddToWishList={handleAddToWishList}
            handleRemoveToWishList={handleRemoveToWishList}
            click={click}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ProductCard;
