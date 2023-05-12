import AllEvents from 'components/shop/AllEvents';
import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import React from 'react';

const ShopAllEventsPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={5} />
        </div>

        <div className='w-full'>
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEventsPage;
