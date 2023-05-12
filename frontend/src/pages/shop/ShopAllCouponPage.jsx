import AllCoupons from 'components/shop/AllCoupons';
import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import React from 'react';

const ShopAllCouponPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={8} />
        </div>

        <div className='w-full'>
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCouponPage;
