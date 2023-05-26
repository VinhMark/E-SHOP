import { backend_url } from 'api/server';
import Ratings from 'components/Products/Ratings';
import ProductCard from 'components/Route/ProductCard/ProductCard';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllEventByShop } from 'redux/actions/event';
import styles from 'styles/style';

const ShopProfileData = ({ isOwner }) => {
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const { seller } = useSelector((state) => state.shop);
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEventByShop(seller._id));
  }, [dispatch, seller]);

  const allReviews = products && products.map((item) => item.reviews).flat();

  return (
    <div className='w-full'>
      {/* Tab header */}
      <div className='w-full flex items-center justify-between flex-wrap mt-8 800px:mt-0'>
        <div className='flex items-center '>
          <div className='flex items-center'>
            <h5
              onClick={() => setActive(1)}
              className={`font-[600] 800px:text-[20px] text-md ${
                active === 1 ? 'text-[red]' : 'text-[#333]'
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>

          <div className='flex items-center'>
            <h5
              onClick={() => setActive(2)}
              className={`font-[600] 800px:text-[20px] text-md ${
                active === 2 ? 'text-[red]' : 'text-[#333]'
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className='flex items-center'>
            <h5
              onClick={() => setActive(3)}
              className={`font-[600]  800px:text-[20px] text-md ${
                active === 3 ? 'text-[red]' : 'text-[#333]'
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        {/* Button right header */}
        <div>
          {isOwner && (
            <Link to='/dashboard' className={`${styles.button} !rounded-[4px] !h-[42px]`}>
              <span className='text-white'>Go Dashboard</span>
            </Link>
          )}
        </div>
      </div>

      {/* Tab content */}
      {active === 1 && (
        <div className='mt-5 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-t'>
          {products && products.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      )}

      {active === 2 && (
        <div className='mt-5 grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-t'>
          {events && events.map((i, index) => <ProductCard data={i} key={index} isEvent={true} />)}
        </div>
      )}

      {active === 3 && (
        <div className='w-full'>
          {allReviews.map((item) => (
            <div className='w-full flex my-3 bg-white p-4 rounded-md' key={item._id}>
              <img
                src={`${backend_url}/${item.user.avatar}`}
                alt=''
                className='w-[50px] h-[50px] rounded-full object-cover'
              />
              <div className=''>
                <div className='flex w-full items-center gap-2'>
                  <h1 className='font-[600]'>{item.user.name}</h1>
                  <Ratings ratings={item.rating} />
                </div>
                <p className='text-[#000000a7]'>{item.comment}</p>
                <p className=' mt-2 text-sm text-[#0000007a]'>{new Date(item.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopProfileData;
