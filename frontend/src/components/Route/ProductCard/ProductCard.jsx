import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../styles/style';
import { AiFillHeart, AiFillStar, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart, AiOutlineStar } from 'react-icons/ai';
import ProductDetailCard from '../ProductDetailCard/ProductDetailCard';

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, '-');

  return (
    <div className='w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer'>
      <div className='flex justify-end'></div>
      <Link to={`/product/${product_name}`}>
        <img src={data.image_Url[0].url} alt="" className='w-full h-[170px] object-contain' />
      </Link>
      <Link to='/'>
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>
      <Link to={`/product/${product_name}`}>
        <h4 className='mb-3 font-[500] line-clamp-2 '>
          {data.name}
        </h4>

        <div className='flex'>
          <AiFillStar size={20} className='mr-2 cursor-pointer' color='#f6ba00' />
          <AiFillStar size={20} className='mr-2 cursor-pointer' color='#f6ba00' />
          <AiFillStar size={20} className='mr-2 cursor-pointer' color='#f6ba00' />
          <AiFillStar size={20} className='mr-2 cursor-pointer' color='#f6ba00' />
          <AiOutlineStar size={20} className='mr-2 cursor-pointer' color='#f6ba00' />
        </div>

        {/* Price and discount total sell */}
        <div className='py-2 flex items-center justify-between'>
          {/* price */}
          <div className='flex'>
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.price === 0 ? data.price : data.discount_price} $
            </h5>
            <h4 className={`${styles.price}`}>
              {data.price ? data.price + ' $' : null}
            </h4>
          </div>
          {/* total sell */}
          <span className='font-[500] text-[17px] text-[#68d284]'>
            {data.total_sell ? data.total_sell + ' sold' : null}
          </span>
        </div>
      </Link>

      {/* side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            onClick={() => setClick(!click)}
            color={click ? 'red' : '#333'}
            title='Remove from Wishlist'
            className='cursor-pointer absolute right-2 top-5'
          />
        ) : (
          <AiOutlineHeart
            size={22}
            onClick={() => setClick(!click)}
            color={click ? 'red' : '#333'}
            title='Add to Wishlist'
            className='cursor-pointer absolute right-2 top-5'
          />
        )}

        <AiOutlineEye
          size={22}
          onClick={() => setOpen(!open)}
          color='#333'
          title='Quick view'
          className='cursor-pointer absolute right-2 top-14'
        />
        <AiOutlineShoppingCart
          size={22}
          color='#444'
          title='Add to card'
          className='cursor-pointer absolute right-2 top-24'
        />

        {
          open ? (
            <ProductDetailCard setOpen={setOpen} data={data} />
          ) : null
        }
      </div>
    </div>
  )
}

export default ProductCard