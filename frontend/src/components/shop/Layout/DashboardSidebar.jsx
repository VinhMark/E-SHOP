import React from 'react';
import { AiOutlineFolderAdd, AiOutlineGift } from 'react-icons/ai';
import { VscNewFile } from 'react-icons/vsc';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { CiMoneyBill, CiSettings } from 'react-icons/ci';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { BiMessageAltDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';

const pathUrl = [
  { title: 'Dashboard', path: 'dashboard', icon: <RxDashboard size={25} /> },
  { title: 'All Orders', path: 'orders', icon: <FiShoppingBag size={25} /> },
  { title: 'All Products', path: 'products', icon: <FiPackage size={25} /> },
  { title: 'Create Product', path: 'create-product', icon: <AiOutlineFolderAdd size={25} /> },
  { title: 'Events', path: 'events', icon: <MdOutlineLocalOffer size={25} /> },
  { title: 'Create Event', path: 'create-event', icon: <VscNewFile size={25} /> },
  { title: 'Withdraw Money', path: 'withdraw-money', icon: <CiMoneyBill size={25} /> },
  { title: 'Inbox', path: 'inbox', icon: <BiMessageAltDetail size={25} /> },
  { title: 'Discount Codes', path: 'coupons', icon: <AiOutlineGift size={25} /> },
  { title: 'Refunds', path: 'refunds', icon: <HiOutlineReceiptRefund size={25} /> },
];

const DashboardSidebar = ({ active }) => {
  const menuClass = 'hidden 800px:block';
  console.log(active);
  return (
    <div className='w-full h-full overflow-y-auto'>
      {pathUrl.map((item, index) => (
        <Link
          key={index}
          to={`/shop/${item.path}`}
          className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
            active === item.path && 'text-white !bg-[#3321c8]'
          } hover:bg-gray-200`}
        >
          {item.icon}
          <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>{item.title}</h5>
        </Link>
      ))}

      <Link
        to='/shop/settings'
        className={`w-full flex items-center p-4 justify-center 800px:justify-start ${
          active === 11 ? 'text-[crimson]' : 'text-[#555]'
        } hover:bg-gray-200`}
      >
        <CiSettings size={25} />
        <h5 className={`pl-2 text-lg font-[500] ${menuClass}`}>Settings</h5>
      </Link>
    </div>
  );
};

export default DashboardSidebar;
