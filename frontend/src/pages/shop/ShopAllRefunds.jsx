import AllRefundOrders from 'components/shop/AllRefundOrders';
import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import React from 'react';

const ShopAllRefunds = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={10} />
        </div>
        <div className='w-full justify-center flex'>
          <AllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
