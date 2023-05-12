import CreateEvent from 'components/shop/CreateEvent';
import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import React from 'react';

const ShopCreateEventPage = () => {
  return (
    <div>
      <DashBoardHeader />

      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={6} />
        </div>

        <div className='w-full justify-center flex'>{<CreateEvent />}</div>
      </div>
    </div>
  );
};

export default ShopCreateEventPage;
