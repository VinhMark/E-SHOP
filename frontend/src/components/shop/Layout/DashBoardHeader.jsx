import React from 'react';
import { AiOutlineGift } from 'react-icons/ai';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiMessageAltDetail } from 'react-icons/bi';
import { backend_url } from 'api/server';

const DashBoardHeader = () => {
  const { seller } = useSelector((state) => state.shop);

  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
      <div>
        <Link to='/dashboard'>
          <img src='https://shopo.quomodothemes.website/assets/images/logo.svg' alt='' />
        </Link>
      </div>
      <div className='flex items-center'>
        <Link to='/dashboard/coupon' className='hidden 800px:flex items-start mr-4'>
          <AiOutlineGift color='#555' size={30} className='mr-5 cursor-pointer' />
        </Link>
        <Link to='/dashboard-events' className='hidden 800px:flex items-start mr-4'>
          <MdOutlineLocalOffer color='#555' size={30} className='mr-5 cursor-pointer' />
        </Link>
        <Link to='/dashboard-products' className='hidden 800px:flex  items-start mr-4'>
          <FiShoppingBag size={30} color='#555' className='mr-2 cursor-pointer' />
        </Link>
        <Link to='/dashboard-orders' className='hidden 800px:flex  items-start mr-4'>
          <FiPackage size={30} color='#555' className='mr-2 cursor-pointer' />
        </Link>
        <Link to='/dashboard-messages' className='hidden 800px:flex  items-start mr-4'>
          <BiMessageAltDetail size={30} color='#555' className='mr-2 cursor-pointer' />
        </Link>
        <Link to={`/shop/${seller._id}`}>
          <img src={`${backend_url}${seller.avatar}`} alt='' className='w-[50px] h-[50px] object-cover rounded-full ' />
        </Link>
      </div>
    </div>
  );
};

export default DashBoardHeader;
