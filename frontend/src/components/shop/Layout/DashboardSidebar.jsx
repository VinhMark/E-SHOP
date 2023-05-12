import React from 'react';
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai';
import { VscNewFile } from 'react-icons/vsc';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { CiSettings } from 'react-icons/ci';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { BiMessageAltDetail } from 'react-icons/bi';

const DashboardSidebar = ({ active }) => {
  const menuClass = 'hidden 800px:block';

  return (
    <div className='w-full h-[89vh] bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10'>
      {/* Single item */}
      <Link
        to='/dashboard'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 1 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <RxDashboard size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>Dashboard</h5>
      </Link>

      <Link
        to='/dashboard-orders'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 2 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <FiShoppingBag size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>All Orders</h5>
      </Link>

      <Link
        to='/dashboard-products'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 3 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <FiPackage size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>All Products</h5>
      </Link>

      <Link
        to='/dashboard-create-product'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 4 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <AiOutlineFolderAdd size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>Create Product</h5>
      </Link>

      <Link
        to='/dashboard-events'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 5 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <MdOutlineLocalOffer size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>All Events</h5>
      </Link>

      <Link
        to='/dashboard-create-event'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 6 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <VscNewFile size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>Create Event</h5>
      </Link>

      <Link
        to='/dashboard-inbox'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 7 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <BiMessageAltDetail size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>Shop Inbox</h5>
      </Link>

      <Link
        to='/dashboard-coupons'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 8 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <AiOutlineGift size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>Discount Codes</h5>
      </Link>

      <Link
        to='/dashboard-refunds'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 9 ? 'text-[crimson]' : 'text-[#555]'
        }`}
      >
        <CiSettings size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>Settings</h5>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
