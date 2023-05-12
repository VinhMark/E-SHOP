import AllProducts from 'components/shop/AllProducts';
import DashBoardHeader from 'components/shop/Layout/DashBoardHeader';
import DashboardSidebar from 'components/shop/Layout/DashboardSidebar';
import React from 'react';

const ShopAllProductsPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className='flex justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={3} />
        </div>

        <div className='w-full'>
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProductsPage;
