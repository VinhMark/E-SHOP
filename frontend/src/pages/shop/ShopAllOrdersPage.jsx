import AllOrders from 'components/shop/AllOrders';
import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import React from 'react';

const ShopAllOrdersPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={2} />
        </div>
        <div className='w-full justify-center flex'>
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrdersPage;
